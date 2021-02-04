import React from 'react';
import { ChessPiece } from '../models/ChessPiece';
import { Position } from '../models/Position';
import { Colour, Optional } from '../types';
import { Cell } from './Cell';

interface RowProps {
  initialColour: Colour;
  column: number;
  row: Optional<ChessPiece>[];
  viewCorrection: Colour;
  cellClickHandle: (position: Position) => void;
}

export const Row: React.FC<RowProps> = ({initialColour, row, viewCorrection, column, cellClickHandle}) => {
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
    <Cell backgroundColor={getBackgroundColour(false)} piece={row[0]} viewCorrection={viewCorrection} position={{ x: column, y: 0 }} onClick={cellClickHandle}/>
    <Cell backgroundColor={getBackgroundColour(true)} piece={row[1]} viewCorrection={viewCorrection} position={{ x: column, y: 1 }} onClick={cellClickHandle}/>
    <Cell backgroundColor={getBackgroundColour(false)} piece={row[2]} viewCorrection={viewCorrection} position={{ x: column, y: 2 }} onClick={cellClickHandle}/>
    <Cell backgroundColor={getBackgroundColour(true)} piece={row[3]} viewCorrection={viewCorrection} position={{ x: column, y: 3 }} onClick={cellClickHandle}/>
    <Cell backgroundColor={getBackgroundColour(false)} piece={row[4]} viewCorrection={viewCorrection} position={{ x: column, y: 4 }} onClick={cellClickHandle}/>
    <Cell backgroundColor={getBackgroundColour(true)} piece={row[5]} viewCorrection={viewCorrection} position={{ x: column, y: 5 }} onClick={cellClickHandle}/>
    <Cell backgroundColor={getBackgroundColour(false)} piece={row[6]} viewCorrection={viewCorrection} position={{ x: column, y: 6 }} onClick={cellClickHandle}/>
    <Cell backgroundColor={getBackgroundColour(true)} piece={row[7]} viewCorrection={viewCorrection} position={{ x: column, y: 7 }} onClick={cellClickHandle}/>
    </>
  );
};
