import { Colour, PieceType } from '../lib/types';
import { ChessPiece } from './ChessPiece';
import WebSocket from 'ws';

export class Player {
	id: WebSocket;
  colour: Colour;
  capturedPieces: ChessPiece[];

	constructor(id: WebSocket, colour: Colour) {
		this.id = id;
		this.colour = colour;
  }
  
  /**
   * @param piece - The piece to capture.
   */
  public capturePiece(piece: ChessPiece) {
    this.capturedPieces.push(piece);
  }

  /**
   * @returns Whether the opponent's King has been captured.
   */
  public hasCapturedKing = (): boolean => this.capturedPieces.some(piece => piece.type === PieceType.King)
}