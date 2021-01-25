import { Box } from '@chakra-ui/react';
import React from 'react';
import { Link } from '../components';
import { ROUTE_HOME } from '../consts';

interface PlayProps {

}

export const Play: React.FC<PlayProps> = () => {
  console.log('Play Page');
  
  return (
    <Box textAlign="center" fontSize="xl">
      <Link text="Home Page" route={ROUTE_HOME} />
    </Box>
  );
};