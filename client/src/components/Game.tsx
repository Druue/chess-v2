import React from 'react';
import { PLAYER_VIEWS } from '../consts';
import { Colour, Optional } from '../types';
import { Board } from './Board';

interface GameProps {
  socket: WebSocket;
  playerType: Colour;
  winner: Optional<WebSocket>;
  isActivePlayer: boolean;
}

export const Game: React.FC<GameProps> = ({ playerType }) => {
  return (
    <Board playerView={PLAYER_VIEWS[playerType]}/>
  );
};
