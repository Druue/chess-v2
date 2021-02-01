import React from 'react';
import { Colour, Optional } from '../types';

interface GameProps {
  socket: WebSocket;
  playerType: Colour;
  winner: Optional<WebSocket>;
  isActivePlayer: boolean;
  
}

export const Game: React.FC<GameProps> = ({ playerType }) => {
  return (
    <div></div>
  );
};
