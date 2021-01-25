import { Box, Code, Grid, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { ColorModeSwitcher, Link, Logo } from '../components';
import { ROUTE_PLAY } from '../consts';

export const Home: React.FC = () => {
  console.log('Home Page');
  
    return (
      <Box textAlign="center" fontSize="xl">
      <Grid minH="100vh" p={3}>
        <ColorModeSwitcher justifySelf="flex-end" />
        <VStack spacing={8}>
          <Logo h="40vmin" pointerEvents="none" />
          <Text>
            Edit <Code fontSize="xl"> App.tsx</Code> and save to reload.
          </Text>
          <Link text="Play Now!" route={ROUTE_PLAY} />
        </VStack>
      </Grid>
    </Box>
    );
};