import * as dotenv from 'dotenv';
import express from 'express';
import * as http from 'http';
import * as WebSocket from 'ws';
import { Colour, GameStatus, getConnId, Message, Optional, socketMap } from './lib/index';
import { GameState } from './structs';


const main = async () => {
  const app = express();
  const server = http.createServer(app);
  const wss = new WebSocket.Server({ server });
  
  dotenv.config();
  const port = process.env.PORT || 2000;

  const gameStatus: GameStatus = {
    since: Date.now(),
    gamesPlayed: 0,
    gamesWon: 0,
    gamesInitialised: 0,
  };

  const currentConnections: { [connId: number]: GameState } = {};

  setInterval(() => {
    for (const i in currentConnections) {
      if (Object.prototype.hasOwnProperty.call(currentConnections, i)) {
        const gameObj = currentConnections[i];

        if (gameObj.hasWinner()) {
          delete currentConnections[i];
        }
      }
    }
  });


  let currentGame = new GameState(gameStatus.gamesInitialised++);
  let currentConnectionId = 0;
  
  app.get('/', (_req, res) => {
    res.send('hello world');
  });

  wss.on('connection', (ws: WebSocket) => {
    /**
     * *Two Player Game. Each pair of connections are added to the same game
     */

    const con = ws;
    socketMap.set(con, currentConnectionId);
    const playerType = currentGame.addPlayer(con);
    currentConnections[0] = currentGame;
    let message: Message;

    console.log(
      'Player %s placed in game %s as %s',
      currentConnectionId + 1,
      currentGame.id + 1,
      playerType
    );

    message = {
      kind: 'player-type',
      colour: (playerType === Colour.White ? Colour.White : Colour.Black)
    };
    console.log(`Sending player type ${message.colour}`);
    con.send(JSON.stringify(message));

    message = {
      kind: 'board',
      data: currentGame.gameBoard
    };
    con.send(JSON.stringify(message));

    /*
     * once we have two players, there is no way back;
     * a new game object is created;
     * if a player now leaves, the game is aborted (player is not preplaced)
    */
    if (currentGame.hasTwoConnectedPlayers()) {
      message = { kind: 'your-turn' };
      currentGame.playerWhite?.id.send(JSON.stringify(message));
      currentGame = new GameState(gameStatus.gamesInitialised++);
    }

    con.on('message', (eventMsg) => {
      const incomingMsg: Message = JSON.parse(eventMsg.toString());

      if (incomingMsg.kind === 'game-aborted' || incomingMsg.kind ==='game-over') {
        currentGame = new GameState(gameStatus.gamesInitialised++);
        return;
      }

      const conId: Optional<number> = getConnId(con);
      const gameObj = currentConnections[conId];
      gameObj?.messageHandler(incomingMsg, con);
    });

    con.on('close', (code) => {
      const conId = getConnId(con);
      console.log(`${conId + 1} disconnected`);

      if (code === 1001) {
        /*
         * if possible, abort the game; if not, the game is already completed
        */
        console.log(conId);
        console.log(currentConnections);
        const gameObj = currentConnections[conId];

        try {
          gameObj.playerWhite?.id.close();
          gameObj.playerWhite = null;
        } catch (e) {
          console.log(`Player W closing - ${e}`);
        }

        try {
          gameObj.playerBlack?.id.close();
          gameObj.playerBlack = null;
        } catch (e) {
          console.log(`Player B closing - ${e}`);
        }
      }
    });

    // * Next Connection
    currentConnectionId++;
  });

  server.listen(port, () => {
    console.log(`server started on localhost:${port}`);
  });

  // process.on('uncaughtException', () => server.close());
  process.on('SIGTERM', () => server.close());
};

main().catch((err) => {
  console.error(err);
});