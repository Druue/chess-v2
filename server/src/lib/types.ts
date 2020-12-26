import { ChessPiece, GameBoard, Position } from './structs';
import * as WebSocket from 'ws';

export type Optional<T> = T | null | undefined;
export type Direction = 1 | -1;

export enum PieceType {
	Pawn   = 'PAWN',
	Rook   = 'ROOK',
	Knight = 'KNIGHT',
	Bishop = 'BISHOP',
	Queen  = 'QUEEN',
	King   = 'KING'
}

export enum Colour {
	Black = 'BLACK',
	White = 'WHITE',
}

export const PIECES_ORDER = [
	PieceType.Rook,
	PieceType.Knight,
	PieceType.Bishop,
	PieceType.Queen,
	PieceType.King,
	PieceType.Bishop,
	PieceType.Knight,
	PieceType.Rook
];

export interface GameStatus {
	since: number,
	gamesPlayed: number,
	gamesWon: number,
	gamesInitialised: number,
}

export interface PieceProps {
	forwards: boolean,
	backwards: boolean,
	horizontal: boolean,
	diagonal: boolean,
	knight: boolean,
	oneStep: boolean,
}

export interface ValidationProps {
	gameBoard: GameBoard,
	piece: ChessPiece,
	direction: Direction,
	validMoves: Position[],
	oneStep: boolean,
}

export const socketMap = new WeakMap<WebSocket, number>();