import { O_BOARD, S_YOUR_TURN, T_MOVE_PIECE, Colour, Optional } from '..';
import { ChessPiece, GameBoard, Player, Position } from '.';
import * as WebSocket from 'ws';

export class GameState {
  id: number;
  playerWhite: Optional<Player>;
  playerBlack: Optional<Player>;
  winner: Optional<Player>;
  gameBoard: GameBoard;

	constructor(id: number, size: number = 8) {
    this.id = id;
    this.playerWhite = null;
    this.playerBlack = null;
    this.winner = null;
    this.gameBoard = new GameBoard(size);
  }

  /**
   * Attempts to move a piece from the given position to the target position
   * 
   * @param start The starting position to move from
   * @param target The target position to move to
   */
  public movePiece(start: Position, target: Position): void {
    const cell: Optional<ChessPiece> = this.gameBoard.movePiece(start, target)
    if (!cell) return;

		(cell.colour === Colour.White) 
			? this.playerWhite?.capturePiece(cell)
		  : this.playerBlack?.capturePiece(cell)
  }

  /**
   * Checks whether the second player has connected to the game yet.
   * 
   * @returns A boolean value on playerBlack's existence.
   */
  public hasTwoConnectedPlayers = (): boolean => this.playerBlack != null;
  
  /**
   * Attempts to connect the given websocket to the game.
   * 
   * @param playerId - The identifying websocket to connect.
   * @throws {Error} Game already full.
   */
  public addPlayer = (playerId: WebSocket): string  => {
    if (!this.playerWhite) {
			this.playerWhite = new Player(playerId, Colour.White)
			return Colour.White
		} else if (!this.playerBlack) {
			this.playerBlack = new Player(playerId, Colour.Black)
			return Colour.Black
    }
    
    throw new Error("Game already full!");
  }

  /**
   * Checks whether a player has won the game.
   * 
   * @returns {boolean} Whether the winner exists
   */
  public hasWinner = (): boolean => {
    if (this.playerWhite?.hasCapturedKing()) this.winner = this.playerWhite;
    else if (this.playerBlack?.hasCapturedKing()) this.winner = this.playerBlack;

    return this.winner != null;
  }

  public messageHandler = (message: any, connection: WebSocket) => {
    let currentPlayerIsWhite = this.playerWhite?.id === connection;

    switch (message.type) {
      case T_MOVE_PIECE:
        this.movePiece(message.data.from, message.data.to)
        this.sendUpdatedBoard();
        currentPlayerIsWhite ? this.playerBlack?.id.send(S_YOUR_TURN) : this.playerWhite?.id.send(S_YOUR_TURN);
        break;
    }
  }

  public sendUpdatedBoard = () => {
    const boardMessage = O_BOARD;
    boardMessage.data = this.gameBoard;

    this.playerBlack?.id.send(JSON.stringify(boardMessage));
    this.playerWhite?.id.send(JSON.stringify(boardMessage));
  }
}