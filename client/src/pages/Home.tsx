import { Box, Code, Grid, Link, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { Link as ReactLink } from 'react-router-dom';
import { ColorModeSwitcher } from '../components/ColorModeSwitcher';
import { Logo } from '../components/Logo';

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
          <Link
            as={ReactLink}
            color="teal.500"
            to="/play"
            fontSize="2xl"
            rel="noopener noreferrer"
          >
            Play Now!
          </Link>
        </VStack>
      </Grid>
    </Box>
    );
};