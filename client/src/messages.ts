import { Position } from './models/Position';
import { Colour } from './types';

export interface GameStartMessage {
  kind: 'game-start'
}

export interface GameOverMessage {
  kind: 'game-over'
}

export interface GameAbortedMessage {
  kind: 'game-aborted'
}

export interface ChangeTurnMessage {
  kind: 'change-turn'
}

export interface PlayerTypeMessage {
  kind: 'player-type'
  colour: Colour
}

export interface MovePieceMessage {
  kind: 'move-piece'
  from: Position
  to: Position
}

export type Message = 
  | GameStartMessage 
  | GameOverMessage 
  | GameAbortedMessage 
  | ChangeTurnMessage 
  | PlayerTypeMessage 
  | MovePieceMessage

// Now you can do
// const msg: Message = JSON.parse(something);
// if (msg.kind === 'player-type') {
//   console.log(msg.colour);
// }