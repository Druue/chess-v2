import WebSocket from 'ws';
import { GameBoard } from './models/GameBoard';
import { Colour, Optional } from './types';

export class Game {
  socket: WebSocket;
  playerType: Optional<Colour>;
  isActivePlayer: boolean;
  board: Optional<GameBoard>;

  constructor(socket: WebSocket) {
    this.socket = socket;
    this.isActivePlayer = false;
    this.board = null;
  }

  changeActivePlayer = () => this.isActivePlayer = !this.isActivePlayer;

  setPlayerType = (playerType: Colour) => this.playerType = playerType;

  setBoard = (board: GameBoard) => this.board = board;

  // TODO
  generateBoard = () => {
    console.log('Generate Board not yet implemented');
  }
}