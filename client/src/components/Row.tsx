import React from 'react';
import { ChessPiece } from '../models/ChessPiece';
import { Colour, Optional } from '../types';
import { Cell } from './Cell';

interface RowProps {
  initialColour: Colour;
  row: Optional<ChessPiece>[];
}

export const Row: React.FC<RowProps> = ({initialColour, row}) => {
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
    <Cell backgroundColor={getBackgroundColour(false)} chessPiece={row[0]}/>
    <Cell backgroundColor={getBackgroundColour(true)} chessPiece={row[1]}/>
    <Cell backgroundColor={getBackgroundColour(false)} chessPiece={row[2]}/>
    <Cell backgroundColor={getBackgroundColour(true)} chessPiece={row[3]}/>
    <Cell backgroundColor={getBackgroundColour(false)} chessPiece={row[4]}/>
    <Cell backgroundColor={getBackgroundColour(true)} chessPiece={row[5]}/>
    <Cell backgroundColor={getBackgroundColour(false)} chessPiece={row[6]}/>
    <Cell backgroundColor={getBackgroundColour(true)} chessPiece={row[7]}/>
    </>
  );
};
