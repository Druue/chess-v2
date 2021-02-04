import { Square } from '@chakra-ui/react';
import React from 'react';
import { ICONS, PIECE_VIEW_CORRECTION } from '../consts';
import { ChessPiece } from '../models/ChessPiece';
import { Position } from '../models/Position';
import { Colour, Optional } from '../types';
import { Piece } from './Piece';

interface CellProps {
  backgroundColor: string;
  piece: Optional<ChessPiece>;
  position: Position;
  viewCorrection: Colour;
  onClick: (position: Position) => void;
}

export const Cell: React.FC<CellProps> = ({
  backgroundColor,
  piece,
  viewCorrection,
  position,
  onClick
}) => {

  const handleClick = () => {
    onClick(position);
  };

  return (
    <Square
    bg={backgroundColor}
    minHeight='100%'
    minWidth='12.5%'
    onClick={handleClick}
    transform={PIECE_VIEW_CORRECTION[viewCorrection]}
    >
      {piece 
        && <Piece 
          type={piece.type} 
          colour={piece.colour} 
          icon={ICONS[`${piece.colour}-${piece.type}`]}
        />
      }
    </Square>
  );
};
