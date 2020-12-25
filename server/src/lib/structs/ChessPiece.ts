import { Colour, PieceType } from "..";
import { Position } from ".";

export class ChessPiece {
  type: PieceType;
  colour: Colour;
  position: Position;
  availableMoves: Position[];

  constructor(type: PieceType, colour: Colour, position: Position) {
    this.type = type;
    this.colour = colour;
    this.position = position;
    this.availableMoves = [];
  }

  /**
   * Moves the chess piece.
   * 
   * @param target - The target position.
   */
  public move(target: Position): void {
    this.position.x = target.x;
    this.position.y = target.y;
  }

  /**
   * Updates the list of valid moves for the chess piece.
   * 
   * @param moves - The updated list of valid moves
   */
  public updateValidMoves(moves: Position[]): void {
    this.availableMoves = moves;
  }
}