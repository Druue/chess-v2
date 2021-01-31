import * as React from 'react';
// import { Position } from '../models/Position';
import { Colour, PieceType } from '../types';

interface PieceProps {
  type: PieceType;
  colour: Colour;
  // position: Position;
  icon?: any
}

export const Piece: React.FC<PieceProps> = ({ icon, colour, type }) => {
  return (
    <div className='piece'>
      <img
        className='chess-piece'
        src={icon}
        alt={`${colour}-${type}`}
      />
    </div>
  );
};