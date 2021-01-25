import { Colour, PieceType } from '../types';
import { Position } from './Position';

export class ChessPiece {
  type: PieceType;
  colour: Colour;
  position?: Position;

  constructor(type: PieceType, colour: Colour, position?: Position) {
    this.type = type;
    this.colour = colour;
    this.position = position;
  }
}