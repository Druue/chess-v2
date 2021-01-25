export type Optional<T> = T | null | undefined;
export type Direction = 1 | -1;

export enum PieceType {
  Pawn = 'PAWN',
  Rook = 'ROOK',
  Knight = 'KNIGHT',
  Bishop = 'BISHOP',
  Queen = 'QUEEN',
  King = 'KING',
}

export enum Colour {
  Black = 'BLACK',
  White = 'WHITE',
}

export interface GameStatus {
  since: number;
  gamesPlayed: number;
  gamesWon: number;
  gamesInitialised: number;
}