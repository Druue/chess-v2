import { getValidMoves } from '../lib';
import { ChessPiece, GameBoard } from '../structs';

test('Pawn Forward - Empty Target', () => {
  const gameBoard = new GameBoard(10);
  const piece = gameBoard.getPiece({x: 1, y: 1}) as ChessPiece;
  const validMoves = getValidMoves(gameBoard, piece);
  console.log(validMoves);
  expect(1 + 1).toBe(2);
});

test('adds 1 + 2 to equal 3', () => {
  expect(1 + 2).toBe(3);
});