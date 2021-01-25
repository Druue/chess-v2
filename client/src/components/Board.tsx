import { SimpleGrid } from '@chakra-ui/react';
import * as React from 'react';

interface BoardProps {
  
}

export class Board extends React.Component<BoardProps> {
  generateBoardArray = () => {
    console.log('hi');
  }

  render() {
    return <SimpleGrid columns={8} spacing={1}></SimpleGrid>;
  }
}
