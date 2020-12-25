import { ChessPiece, GameBoard, Position } from './structs';
import { Colour, Direction, Optional, PieceProps, PieceType, ValidationProps } from './types';

/**
 * Retrieves the list of valid moves for the given chess piece with the given board state.
 * 
 * @param gameBoard 
 * @param piece 
 * @returns {Position[]} List of valid positions to move to.
 */
export const getValidMoves = (gameBoard: GameBoard, piece: ChessPiece): Position[] => {
	const validMoves: Position[] = [];
	const direction: Direction = getDirection(piece);
	const pieceProps: PieceProps = getPieceProps(piece);

	const validationProps: ValidationProps = {
		gameBoard: gameBoard,
		piece: piece,
		direction: direction,
		validMoves: validMoves,
		oneStep: pieceProps.oneStep,
	};

	if (pieceProps.knight) {
		validateKnight(validationProps);
		return validMoves;
  }

  if (pieceProps.forwards)
    validateVertical(validationProps);

  if (pieceProps.backwards) {
    validationProps.direction *= -1;    // Flip direction to make backwards
    validateVertical(validationProps);  // Validate
    validationProps.direction *= -1;    // Reset direction back
  }

  if (pieceProps.horizontal)
    validateHorizontal(validationProps);

  if (pieceProps.diagonal)
    validateDiagonal(validationProps);
  
  return validMoves;
}

const validate = (piece: ChessPiece, gameBoard: GameBoard, x: number, y: number, isDiagonal: boolean = false) => gameBoard.validateCoord({ x, y})
  && validatePawn(piece, gameBoard.getPiece({ x, y}), isDiagonal)
  && moveValidation(piece, gameBoard.getPiece({ x, y}));

const moveValidation = (piece: ChessPiece, cell: Optional<ChessPiece>) => !cell
	? true
  : (piece.colour !== cell.colour);

const validateVertical = ({ gameBoard, piece, direction, validMoves, oneStep }: ValidationProps) => {
  const dx = piece.position.x;
  let dy = piece.position.y + direction;

	do {
		if (validate(piece, gameBoard, dx, dy)) {
			validMoves.push({ x: dx, y: dy });
			
			if (gameBoard.getPiece({ x: dx, y: dy})) return
			dy += direction;
		} else return
	} while (!oneStep)
}

const validateHorizontal = ({ gameBoard, piece, validMoves, oneStep }: ValidationProps) => {
	let px = piece.position.x + 1
	let nx = piece.position.x - 1
	const dy = piece.position.y

	do {
		if (validate(piece, gameBoard, px, dy)) {
			validMoves.push({ x: px, y: dy })

			gameBoard.getPiece({ x: px, y: dy }) ? px = 8 : px++

		} else if (validate(piece, gameBoard, nx, dy)) {
			validMoves.push({ x: nx, y: dy })

			gameBoard.getPiece({ x: nx, y: dy }) ? nx = 8 : nx++
		} else return
	} while (!oneStep)
}

const validateDiagonal = ({ gameBoard, piece, direction, validMoves, oneStep }: ValidationProps) => {
	let forwardLeft: Position = { x: piece.position.x - 1, y: piece.position.y + direction };
	let forwardRight: Position = { x: piece.position.x + 1, y: piece.position.y + direction };
	let backwardsLeft: Position = { x: piece.position.x - 1, y: piece.position.y - direction};
	let backwardsRight: Position = { x: piece.position.x + 1, y: piece.position.y - direction };

	do {
		// forward left
		if (validate(piece, gameBoard, forwardLeft.x, forwardLeft.y, true)) {
      validateTraverse(gameBoard, forwardLeft, -1, direction, validMoves);

			// forward right
		} else if (validate(piece, gameBoard, forwardRight.x, forwardRight.y, true)) {
      validateTraverse(gameBoard, forwardRight, 1, direction, validMoves);

			// down left
		} else if (validate(piece, gameBoard, backwardsLeft.x, backwardsLeft.y, true)) {
      validateTraverse(gameBoard, backwardsLeft, -1, direction * -1, validMoves);

			// down right
		} else if (validate(piece, gameBoard, backwardsRight.y, backwardsRight.y, true)) {
			validateTraverse(gameBoard, backwardsRight, 1, direction * -1, validMoves);

		} else return
	} while (!oneStep)
}

const validateTraverse = (gameBoard: GameBoard, pos: Position, leftRight: number, upDown: number, validMoves: Position[]) => {
	validMoves.push({ x: pos.x, y: pos.y })
	
	if (gameBoard.getPiece({ x: pos.x, y: pos.y })) {
		pos.x = 9;
		pos.y = 9;
  }
  
  pos.x += leftRight;
  pos.y += upDown;
}

const validatePawn = (piece: ChessPiece, cell: Optional<ChessPiece>, isDiagonal: boolean) => {
  if (piece.type !== PieceType.Pawn) return true; // if not pawn
	if (cell && piece.colour === cell.colour) return false; // if cell has same colour as piece
	if (isDiagonal && !cell) return false; // pawn cant move diagonally if it does not contain oponent piece
	if (!isDiagonal && cell) return false; // pawn cant move forward if there is a piece there

	return true;
}

const validateKnight = ( { gameBoard, piece, validMoves }: ValidationProps ) => {
  const possibleMoves: Position[] = [
		{ x: -1, y: 2 },
		{ x: 1, y: 2 },
		{ x: 2, y: 1 },
		{ x: 2, y: -1 },
		{ x: -1, y: -2 },
		{ x: 1, y: -2 },
		{ x: -2, y: 1 },
		{ x: -2, y: -1 },
	];

	possibleMoves.forEach(el => {
		const dx = piece.position.x + el.x
		const dy = piece.position.y + el.y
		if (validate(piece, gameBoard, dx, dy)) validMoves.push({ x: dx, y: dy })
	});
}

const getPieceProps = (piece: ChessPiece): PieceProps => {
	const propArr: PieceProps = {
		forwards: false,
		backwards: false,
		horizontal: false,
		diagonal: false,
		knight: false,
		oneStep: false,
	};
	
	switch (piece.type) {
		case PieceType.Pawn:
			propArr.forwards = true
			propArr.diagonal = true
			propArr.oneStep = true
			break

		case PieceType.Rook:
			propArr.forwards = true
			propArr.backwards = true
			propArr.horizontal = true
			break

		case PieceType.Knight:
			propArr.knight = true
			break

		case PieceType.Bishop:
			propArr.diagonal = true
			break

		case PieceType.Queen:
			propArr.forwards = true
			propArr.backwards = true
			propArr.horizontal = true
			propArr.diagonal = true
			break

		case PieceType.King:
			propArr.forwards = true
			propArr.backwards = true
			propArr.horizontal = true
			propArr.diagonal = true
			propArr.oneStep = true
			break

		default:
			console.log('Invalid piece given')
			return propArr
	}

	return propArr;
}

/**
 * @param piece The piece to evaluate
 * @returns {1 | -1} Representing the direction to go.
 */
const getDirection = (piece: ChessPiece): (1 | -1) => piece.colour === Colour.White ? 1 : -1;