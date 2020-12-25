import { ChessPiece, Position } from ".";
import { Colour, Optional, PIECES_ORDER, PieceType, getValidMoves} from "..";

export class GameBoard {
  private gameBoard: Optional<ChessPiece>[][];

  constructor(size: number) {
    this.gameBoard = this.generateEmptyBoard(size);
    this.setValidMoves();
  }

  public validateCoord = (pos: Position): boolean => (
    !(pos.x >= this.gameBoard.length || pos.x < 0) && 
    !(pos.y >= this.gameBoard[0].length || pos.y < 0));

  public getPiece = (pos: Position): Optional<ChessPiece> => this.gameBoard[pos.x][pos.y];

  public setValidMoves = () => {
    this.gameBoard.map(arr => arr
			.filter(Boolean)
			.map(cp => cp?.updateValidMoves(getValidMoves(this, cp)))
		);
  }

  /**
   * Attempts to move a piece from the given position to the target position
   * 
   * @param start The starting position to move from
   * @param target The target position to move to
   * 
   * @throws {Error} (No piece to move)
   * 
   * @returns An optional chess piece.
   */
  public movePiece = (start: Position, target: Position): Optional<ChessPiece> => {
    if (!this.gameBoard[start.x][start.y])
      throw new Error("No piece to move!");

    let piece: Optional<ChessPiece> = this.gameBoard[start.x][start.y];
		this.gameBoard[start.x][start.y] = null;

    let targetPiece: Optional<ChessPiece> = this.gameBoard[target.x][target.y];
		this.gameBoard[target.x][target.y] = piece;
    piece?.move(target);
    
    return targetPiece;
  }

  // public getBoard = () => this.gameBoard;

  /**
   * @param size - The length/height of the board to be generated.
   * 
   * @returns A 2D array optionally containing chess pieces.
   */
  private generateEmptyBoard = (size: number): Optional<ChessPiece>[][] => Array(size).fill(null).map(
      (_, i) => Array(size).fill(null).map((_, j) => this.pieceMapper(i, j)))

  /**
   * Maps chess pieces to where they should start on the chess board.
   * 
   * @param x - The current x coordinate of the chess board
   * @param y - The current y coordinate of the chess board
   * 
   * @returns An optional chess piece
   */
  private pieceMapper = (x: number, y: number): Optional<ChessPiece> => {
    if (y === 7) {
	  	return new ChessPiece(PIECES_ORDER[x], Colour.Black, { x, y })
	  } else if (y === 6) {
	  	return new ChessPiece(PieceType.Pawn, Colour.Black, { x, y })
	  } else if (y === 1) {
	  	return new ChessPiece(PieceType.Pawn, Colour.White, { x, y })
	  } else if (y === 0) {
	  	return new ChessPiece(PIECES_ORDER[x], Colour.White, { x, y })
    }
    
    return null;
  }
}