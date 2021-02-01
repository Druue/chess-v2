import { ChessPiece } from './ChessPiece';

export class GameBoard {
  gameBoard: ChessPiece[][];

  constructor(gameBoard: ChessPiece[][]) {
    this.gameBoard = gameBoard;
  }
}