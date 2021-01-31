import { Box, Code, Grid, Text, VStack } from '@chakra-ui/react';
import WebSocket from 'isomorphic-ws';
import React from 'react';
import create from 'zustand';
import { ColorModeSwitcher, Link, Logo } from '../components';
import { ROUTE_PLAY, WEB_SOCKET_URL } from '../consts';
import { Game } from '../Game';
import { Message } from '../messages';

export const Home: React.FC = () => {
  const onClick = () => {
    const socket = new WebSocket(WEB_SOCKET_URL);
    const game = new Game(socket);

    const useStore = create(() => ({
      socket: socket,
      game: game,
    }));

    socket.onopen = function() {
      socket.send('{}');
    };

    socket.onmessage = (incomingMsg) => {
      const message: Message = JSON.parse(incomingMsg.data.toString());
      console.log(incomingMsg.data);
    
      switch (message.kind) {
        case 'your-turn':
          game.changeActivePlayer();
          // componentDidUpdate() :: React lib
          game.generateBoard();
          break;
      
        case 'board':
          game.setBoard(message.data);
          game.generateBoard();
          break;
      
        case 'player-type':
          game.setPlayerType(message.colour);
          break;
      
        case 'game-over':
          // TODO
          break;
      
        case 'game-aborted':
          // TODO
          break;
      
        default:
          break;
      }
    };
  };

  return (
    <Box textAlign="center" fontSize="xl">
      <Grid minH="100vh" p={3}>
        <ColorModeSwitcher justifySelf="flex-end" />
        <VStack spacing={8}>
          <Logo h="40vmin" pointerEvents="none" />
          <Text>
            Edit <Code fontSize="xl"> App.tsx</Code> and save to reload.
          </Text>
          <Link text="Play Now!" route={ROUTE_PLAY} onClick={onClick} />
        </VStack>
      </Grid>
    </Box>
  );
};