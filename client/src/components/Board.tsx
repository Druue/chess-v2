import { SimpleGrid } from '@chakra-ui/react';
import * as React from 'react';
import { PLAYER_VIEWS } from '../consts';
import { ChessPiece } from '../models/ChessPiece';
import { Colour, Optional } from '../types';
import { Row } from './Row';

interface BoardProps {
  board: Optional<ChessPiece>[][];
  playerType: Colour;
}

export const Board: React.FC<BoardProps> = ({ playerType, board }) => {
  return (
    <SimpleGrid 
      columns={8}
      spacing={0}
      transform={PLAYER_VIEWS[playerType]}
    >
      <Row initialColour={Colour.White} row={board[0]} viewCorrection={playerType}/>
      <Row initialColour={Colour.Black} row={board[1]} viewCorrection={playerType}/>
      <Row initialColour={Colour.White} row={board[2]} viewCorrection={playerType}/>
      <Row initialColour={Colour.Black} row={board[3]} viewCorrection={playerType}/>
      <Row initialColour={Colour.White} row={board[4]} viewCorrection={playerType}/>
      <Row initialColour={Colour.Black} row={board[5]} viewCorrection={playerType}/>
      <Row initialColour={Colour.White} row={board[6]} viewCorrection={playerType}/>
      <Row initialColour={Colour.Black} row={board[7]} viewCorrection={playerType}/>
    </SimpleGrid>
  );
};
