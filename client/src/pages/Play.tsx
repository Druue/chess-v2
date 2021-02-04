import { Box, Grid, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Board, ColorModeSwitcher, Link } from '../components';
import { Popup } from '../components/Popup';
import { ROUTE_HOME } from '../consts';
import { Game } from '../Game';
import { Message } from '../messages';
import { Position } from '../models/Position';
import { Socket } from '../Socket';
import { Optional } from '../types';

export const Play: React.FC = () => {
  const [game, setGame] = useState(new Game());
  const [move, setMove] = useState<Optional<Position>>(null);
  const socket = Socket.getInstance();
  const [availableMoves, setAvailableMoves] = useState<Position[]>([]);
  let message: Message;
  
  useEffect(() => {
    console.log(`Player type updated to: ${game?.playerType}`);
  }, [game.playerType]);

  useEffect(() => {
    console.log(`from: ${move?.x}, ${move?.y}`);
  }, [move]);

  useEffect(() => {
    socket.onmessage = (eventMsg) => {
      const incomingMsg: Message = JSON.parse(eventMsg.data.toString());
      console.log(incomingMsg.kind);
    
      switch (incomingMsg.kind) {
        case 'game-start':
          setGame(prevState => {
            return {
              ...prevState,
              hasTwoPlayers: true
            };
          });
          break;

        case 'your-turn':
          setTurn(true);
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

  const setTurn = (bool: boolean) => setGame(prevState => {
    return {
      ...prevState,
      isActivePlayer: bool,
    };
  });

  const getPiece = (pos: Position) => game.board?.gameBoard[pos.x][pos.y];

  const hasPiece = (pos: Position): boolean => game.board 
    ? !!getPiece(pos)
    : false;

  const cellClickHandle = (position: Position) => {
    console.log(position);
    
    if (!game.isActivePlayer) return;
    if (!position) return;

    if (!move) {
      if (hasPiece(position)) {
        setMove(position);
        const piece = getPiece(position)!;
        console.log(piece);
        console.log(piece.availableMoves);
        setAvailableMoves(piece.availableMoves);
      }
    } else {
      console.log(`to: ${position.x}, ${position.y}`);
      console.log(availableMoves);
      if (availableMoves.some(p => p.x === position.x && p.y === position.y)) {
        message = {
          kind: 'move-piece',
          from: move,
          to: position
        };
        console.log(message);
        socket.send(JSON.stringify(message));
        setTurn(false);
      }
      setMove(null);
      setAvailableMoves([]);
    }
  };
  
  return (
    <Box textAlign="center" fontSize="xl">
      <Grid minH="100vh" p={3}>
        <ColorModeSwitcher justifySelf="flex-end" />
        { game.isActivePlayer && <div> Your Turn! </div>}
        <VStack spacing={8}>
        { game.hasTwoPlayers 
          && <Popup
            title='Game Start!'
            text={`You are playing as ${game.playerType}`} 
          />
        }
        { game.hasTwoPlayers && game.board
          ? <Board
            playerType={game.playerType!}
            board={game.board.gameBoard}
            cellClickHandle={cellClickHandle}
          />
          : <div>Waiting for a second player!</div>
        }
        <Link text="Home Page" route={ROUTE_HOME} />
        </VStack>
      </Grid>
    </Box>
  );
};