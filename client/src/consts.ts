import blackBishop from './assets/pieces/black-bishop.png';
import blackKing from './assets/pieces/black-king.png';
import blackKnight from './assets/pieces/black-knight.png';
import blackPawn from './assets/pieces/black-pawn.png';
import blackQueen from './assets/pieces/black-queen.png';
import blackRook from './assets/pieces/black-rook.png';
import whiteBishop from './assets/pieces/white-bishop.png';
import whiteKing from './assets/pieces/white-king.png';
import whiteKnight from './assets/pieces/white-knight.png';
import whitePawn from './assets/pieces/white-pawn.png';
import whiteQueen from './assets/pieces/white-queen.png';
import whiteRook from './assets/pieces/white-rook.png';

export const ROUTE_HOME = '/';
export const ROUTE_PLAY = '/play';

export const ICONS: { [key: string]: any } = {
  'BLACK-PAWN': blackPawn,
  'BLACK-ROOK': blackRook,
  'BLACK-QUEEN': blackQueen,
  'BLACK-KING': blackKing,
  'BLACK-BISHOP': blackBishop,
  'BLACK-KNIGHT': blackKnight,
  'WHITE-PAWN': whitePawn,
  'WHITE-ROOK': whiteRook,
  'WHITE-QUEEN': whiteQueen,
  'WHITE-KING': whiteKing,
  'WHITE-BISHOP': whiteBishop,
  'WHITE-KNIGHT': whiteKnight
};

export const PLAYER_VIEWS: { [key: string]: string } = {
  'BLACK': 'rotate(180deg)',
  'WHITE': 'rotate(0deg)'
};

export const PORT = 2000;
export const WEB_SOCKET_BASE_URL = 'ws://localhost:';
export const WEB_SOCKET_URL = `${WEB_SOCKET_BASE_URL}${PORT}`;
export const STATUS = {
	gameWon  : 'Congratulations! You won!',
	gameLost : 'Game over. You lost!',
	aborted  : 'Your gaming partner is no longer available, game aborted.',
	onePlayer: 'Waiting for player 2',
	turn     : 'Your turn!',
	waiting  : 'Waiting for other player to make a move'
};
export const COOKIE_SECRET = 'cIsForCookie';
export const COOKIE_VISITED = 'timesVisited';
