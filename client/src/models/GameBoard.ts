import { ChessPiece } from './ChessPiece';

export class GameBoard {
  private gameBoard: ChessPiece[][];

  constructor(gameBoard: ChessPiece[][]) {
    this.gameBoard = gameBoard;
  }
}