import { Square } from '@chakra-ui/react';
import React, { useState } from 'react';
import { ICONS, PIECE_VIEW_CORRECTION } from '../consts';
import { ChessPiece } from '../models/ChessPiece';
import { Colour, Optional } from '../types';
import { Piece } from './Piece';

interface CellProps {
  backgroundColor: string;
  chessPiece: Optional<ChessPiece>;
  viewCorrection: Colour;
}

export const Cell: React.FC<CellProps> = ({ backgroundColor, chessPiece, viewCorrection }) => {
  const [piece, setPiece] = useState<Optional<ChessPiece>>(chessPiece);

  const HandleClick = () => {
    console.log('Not yet implemented click handler');
  };

  return (
    <Square
    bg={backgroundColor}
    minHeight='100%'
    minWidth='12.5%'
    onClick={HandleClick}
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
