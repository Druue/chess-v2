import { SimpleGrid } from '@chakra-ui/react';
import * as React from 'react';

interface BoardProps {
  playerView: string
}

export const Board: React.FC<BoardProps> = ({ playerView }) => {
  return (
    <SimpleGrid columns={8} spacing={1} transform={playerView}></SimpleGrid>
  );
};
