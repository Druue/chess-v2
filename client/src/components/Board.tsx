import { SimpleGrid } from '@chakra-ui/react';
import * as React from 'react';
import { ChessPiece } from '../models/ChessPiece';
import { Colour, Optional } from '../types';
import { Row } from './Row';

interface BoardProps {
  board: Optional<ChessPiece>[][];
  playerView: string;
}

export const Board: React.FC<BoardProps> = ({ playerView, board }) => {
  return (
    <SimpleGrid columns={8} spacing={0} transform={playerView}>
      <Row initialColour={Colour.White} row={board[0]}/>
      <Row initialColour={Colour.Black} row={board[1]}/>
      <Row initialColour={Colour.White} row={board[2]}/>
      <Row initialColour={Colour.Black} row={board[3]}/>
      <Row initialColour={Colour.White} row={board[4]}/>
      <Row initialColour={Colour.Black} row={board[5]}/>
      <Row initialColour={Colour.White} row={board[6]}/>
      <Row initialColour={Colour.Black} row={board[7]}/>
    </SimpleGrid>
  );
};
