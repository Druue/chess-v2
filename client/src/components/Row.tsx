import React from 'react';
import { ChessPiece } from '../models/ChessPiece';
import { Colour, Optional } from '../types';
import { Cell } from './Cell';

interface RowProps {
  initialColour: Colour;
  row: Optional<ChessPiece>[];
  viewCorrection: Colour;
}

export const Row: React.FC<RowProps> = ({initialColour, row, viewCorrection}) => {
  const getBackgroundColour = (mod: boolean) => {
    const colours = {
      WHITE: '#f5debc',
      BLACK: '#5e4737'
    };

    const other = (initialColour === Colour.White)
      ? Colour.Black
      : Colour.White;
    return mod
      ? colours[initialColour]
      : colours[other];
  };

  return (
    <>
    <Cell backgroundColor={getBackgroundColour(false)} chessPiece={row[0]} viewCorrection={viewCorrection}/>
    <Cell backgroundColor={getBackgroundColour(true)} chessPiece={row[1]} viewCorrection={viewCorrection}/>
    <Cell backgroundColor={getBackgroundColour(false)} chessPiece={row[2]} viewCorrection={viewCorrection}/>
    <Cell backgroundColor={getBackgroundColour(true)} chessPiece={row[3]} viewCorrection={viewCorrection}/>
    <Cell backgroundColor={getBackgroundColour(false)} chessPiece={row[4]} viewCorrection={viewCorrection}/>
    <Cell backgroundColor={getBackgroundColour(true)} chessPiece={row[5]} viewCorrection={viewCorrection}/>
    <Cell backgroundColor={getBackgroundColour(false)} chessPiece={row[6]} viewCorrection={viewCorrection}/>
    <Cell backgroundColor={getBackgroundColour(true)} chessPiece={row[7]} viewCorrection={viewCorrection}/>
    </>
  );
};
