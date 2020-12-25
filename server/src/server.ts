import express from 'express';
import * as WebSocket from 'ws';
import * as http from 'http';
import * as dotenv from 'dotenv';

import { Colour, GameState, GameStatus, getConnId, Optional, O_BOARD, socketMap, S_PLAYER_B, S_PLAYER_W, S_YOUR_TURN } from './lib';

const main = async () => {
  const app = express();
  const server = http.createServer(app);
  const wss = new WebSocket.Server({ server });

  dotenv.config();
  const port = process.env.PORT || 2000;

  let gameStatus: GameStatus = {
    since: Date.now(),
    gamesPlayed: 0,
    gamesWon: 0,
    gamesInitialised: 0,
  }

  let currentConnections: { [connId: number] : GameState } = {};

  setInterval(() => {
    for (const i in currentConnections) {
      if (Object.prototype.hasOwnProperty.call(currentConnections, i)) {
        const gameObj = currentConnections[i];
        
        if (gameObj.hasWinner()) {
          delete currentConnections[i];
        }
      }
    }
  })


  let currentGame = new GameState(gameStatus.gamesInitialised++);
  let currentConnectionId = 0;

  wss.on('connection', (ws: WebSocket) => {
    /**
     * *Two Player Game. Each pair of connections are added to the same game
     */

    let con = ws;
    socketMap.set(con, currentConnectionId);
    let playerType = currentGame.addPlayer(con);
    currentConnections[0] = currentGame;

    console.log(
		  'Player %s placed in game %s as %s',
		  currentConnectionId,
		  currentGame.id,
		  playerType
    );
    
    con.send(playerType === Colour.White ? S_PLAYER_W : S_PLAYER_B);

    const boardMsg = O_BOARD;
    boardMsg.data = currentGame.gameBoard;
    con.send(JSON.stringify(boardMsg));

  /*
	 * once we have two players, there is no way back;
	 * a new game object is created;
	 * if a player now leaves, the game is aborted (player is not preplaced)
	*/
	if (currentGame.hasTwoConnectedPlayers()) {
		currentGame.playerWhite?.id.send(S_YOUR_TURN);
		currentGame = new GameState(gameStatus.gamesInitialised++);
  }
  
  con.on('message', (message) => {
    let oMsg = JSON.parse(message.toString());

    let conId: Optional<number> = getConnId(con);
    let gameObj = currentConnections[conId];
    gameObj.messageHandler(oMsg, con);
  })

  con.on('close', (code) => {
    const conId = getConnId(con);
    console.log(`${conId} disconnected`);

    if (code === 1001) {
      /*
			 * if possible, abort the game; if not, the game is already completed
      */
      let gameObj = currentConnections[conId];

      try {
        gameObj.playerWhite?.id.close();
        gameObj.playerWhite = null;
      } catch (e) {
        console.log(`Player W closing - ${e}`)
      }

      try {
        gameObj.playerBlack?.id.close();
        gameObj.playerBlack = null;
      } catch (e) {
        console.log(`Player B closing - ${e}`)
      }
    }
  });

    // * Next Connection
    currentConnectionId++;
  })
  
	app.listen(port, () => {
		console.log(`server started on localhost:${port}`)
	})
}

main()