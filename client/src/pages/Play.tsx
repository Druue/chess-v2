import { Box, Grid } from '@chakra-ui/react';
import WebSocket from 'isomorphic-ws';
import React, { useEffect, useState } from 'react';
import { ColorModeSwitcher, Link } from '../components';
import { Popup } from '../components/Popup';
import { ROUTE_HOME, WEB_SOCKET_URL } from '../consts';
import { Game } from '../Game';
import { Message } from '../messages';

interface PlayProps {

}

const socket = new WebSocket(WEB_SOCKET_URL);


export const Play: React.FC<PlayProps> = () => {
  const [game, setGame] = useState(new Game(socket));
  
  useEffect(() => {
    console.log(`Player type updated to: ${game?.playerType}`);
  }, [game.playerType]);

  socket.onopen = () => {
    socket.send('{}');
  };

  socket.onmessage = (incomingMsg) => {
    const message: Message = JSON.parse(incomingMsg.data.toString());
    console.log(incomingMsg.data);
    console.log(message.kind);

    switch (message.kind) {
      case 'your-turn':
        
        break;
    
      case 'board':
        setGame(prevState => {
          return {
            ...prevState,
            board: message.data
          };
        });
        break;

      case 'player-type':
        setGame(prevState => {
          console.log(`New colour recieved: ${message.colour}`);
          return {
            ...prevState,
            playerType: message.colour
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
  
  return (
    <Box textAlign="center" fontSize="xl">
      <Grid minH="100vh" p={3}>
        <ColorModeSwitcher justifySelf="flex-end" />
        { game.playerType 
          && <Popup
            title='Game Start!'
            text={`You are playing as ${game.playerType}`} 
          />
        }
        <Link text="Home Page" route={ROUTE_HOME} />
      </Grid>
    </Box>
  );
};