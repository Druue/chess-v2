import { Square } from '@chakra-ui/react';
import * as React from 'react';
import { ICONS } from '../consts';
import { ChessPiece } from '../models/ChessPiece';
import { Optional } from '../types';
import { Piece } from './Piece';

interface CellProps {
  backgroundColor: string;
  piece: Optional<ChessPiece>;
}

export const Cell: React.FC<CellProps> = (props: CellProps) => {
  const piece: Optional<ChessPiece> = props.piece;
  return (
    <Square bg={props.backgroundColor} size='12.5%'>
      {piece
        ? <Piece 
            type={piece.type} 
            colour={piece.colour} 
            icon={ICONS[`${piece.colour}-${piece.type}`]}
          />
        : null
      }
    </Square>
  );
};
