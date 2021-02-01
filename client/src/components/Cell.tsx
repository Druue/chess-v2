import { Square } from '@chakra-ui/react';
import React, { useState } from 'react';
import { ICONS } from '../consts';
import { ChessPiece } from '../models/ChessPiece';
import { Optional } from '../types';
import { Piece } from './Piece';

interface CellProps {
  backgroundColor: string;
  chessPiece: Optional<ChessPiece>;
}

export const Cell: React.FC<CellProps> = ({ backgroundColor, chessPiece }) => {
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
