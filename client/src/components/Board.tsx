import { SimpleGrid } from '@chakra-ui/react';
import * as React from 'react';
import { PLAYER_VIEWS } from '../consts';
import { ChessPiece } from '../models/ChessPiece';
import { Position } from '../models/Position';
import { Colour, Optional } from '../types';
import { Row } from './Row';

interface BoardProps {
  board: Optional<ChessPiece>[][];
  playerType: Colour;
  cellClickHandle: (position: Position) => void;
}

export const Board: React.FC<BoardProps> = ({ playerType, board, cellClickHandle }) => {
  return (
    <SimpleGrid 
      columns={8}
      spacing={0}
      transform={PLAYER_VIEWS[playerType]}
    >
      <Row initialColour={Colour.White} row={board[0]} viewCorrection={playerType} column={0} cellClickHandle={cellClickHandle}/>
      <Row initialColour={Colour.Black} row={board[1]} viewCorrection={playerType} column={1} cellClickHandle={cellClickHandle}/>
      <Row initialColour={Colour.White} row={board[2]} viewCorrection={playerType} column={2} cellClickHandle={cellClickHandle}/>
      <Row initialColour={Colour.Black} row={board[3]} viewCorrection={playerType} column={3} cellClickHandle={cellClickHandle}/>
      <Row initialColour={Colour.White} row={board[4]} viewCorrection={playerType} column={4} cellClickHandle={cellClickHandle}/>
      <Row initialColour={Colour.Black} row={board[5]} viewCorrection={playerType} column={5} cellClickHandle={cellClickHandle}/>
      <Row initialColour={Colour.White} row={board[6]} viewCorrection={playerType} column={6} cellClickHandle={cellClickHandle}/>
      <Row initialColour={Colour.Black} row={board[7]} viewCorrection={playerType} column={7} cellClickHandle={cellClickHandle}/>
    </SimpleGrid>
  );
};
