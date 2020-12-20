import express from 'express';
import * as WebSocket from 'ws';
import * as http from 'http';
import { GameState } from './logic/GameState';


const main = async () => {
  const app = express();
  const server = http.createServer(app);
  const wss = new WebSocket.Server({ server });

  let currentConnections: { [connId: number] : GameState } = {};

  setInterval(() => {
    for (const i in currentConnections) {
      if (Object.prototype.hasOwnProperty.call(currentConnections, i)) {
        const gameObj = currentConnections[i];
        
        if (gameObj !== null) {
          delete currentConnections[i];
        }
      }
    }
  })

  wss.on('connection', (ws: WebSocket) => {
    /**
     * *Two Player Game. Each pair of connections are added to the same game
     */

    let con = ws;
  })
  
	app.listen(2000, () => {
		console.log('server started on localhost:2000')
	})
}