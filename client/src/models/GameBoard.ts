import { Optional } from '../types';
import { ChessPiece } from './ChessPiece';

export class GameBoard {
  gameBoard: Optional<ChessPiece>[][];

  constructor(gameBoard: ChessPiece[][]) {
    this.gameBoard = gameBoard;
  }
}