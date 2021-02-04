import { GameBoard } from './models/GameBoard';
import { Colour, Optional } from './types';

export class Game {
  playerType: Optional<Colour>;
  isActivePlayer: boolean;
  hasTwoPlayers: boolean;
  board: Optional<GameBoard>;

  constructor() {
    this.isActivePlayer = false;
    this.hasTwoPlayers = false;
    this.board = null;
  }
}