import { Box, Grid, VStack } from '@chakra-ui/react';
import WebSocket from 'isomorphic-ws';
import React, { useEffect, useState } from 'react';
import { ColorModeSwitcher, Link } from '../components';
import { Popup } from '../components/Popup';
import { ROUTE_HOME, WEB_SOCKET_URL } from '../consts';
import { Game } from '../Game';
import { Message } from '../messages';

interface PlayProps {

}


export const Play: React.FC<PlayProps> = () => {
  const [game, setGame] = useState(new Game());
  let message: Message;
  
  useEffect(() => {
    console.log(`Player type updated to: ${game?.playerType}`);
  }, [game.playerType]);

  useEffect(() => {
    const socket = new WebSocket(WEB_SOCKET_URL);
    
    socket.onopen = () => {
      socket.send('{}');
    };

    socket.onmessage = (eventMsg) => {
      const incomingMsg: Message = JSON.parse(eventMsg.data.toString());
      console.log(eventMsg.data);
      console.log(incomingMsg.kind);
    
      switch (incomingMsg.kind) {
        case 'your-turn':
          
          break;
      
        case 'board':
          setGame(prevState => {
            return {
              ...prevState,
              board: incomingMsg.data
            };
          });
          break;
        
        case 'player-type':
          setGame(prevState => {
            console.log(`New colour recieved: ${incomingMsg.colour}`);
            return {
              ...prevState,
              playerType: incomingMsg.colour
            };
          });
          break;
        
        case 'game-over':
          break;
        
        case 'game-aborted':
          break;
        
        default:
          break;
      }
    };

    return () => {
      message = { kind: 'game-aborted' };
      socket.send(JSON.stringify(message));
      socket.close();
    };
  }, []);
  
  return (
    <Box textAlign="center" fontSize="xl">
      <Grid minH="100vh" p={3}>
        <ColorModeSwitcher justifySelf="flex-end" />
        <VStack spacing={8}>
        { game.playerType 
          && <Popup
            title='Game Start!'
            text={`You are playing as ${game.playerType}`} 
          />
        }
        <Link text="Home Page" route={ROUTE_HOME} />
        </VStack>
      </Grid>
    </Box>
  );
};