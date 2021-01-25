import React from 'react';
import { Colour, Optional } from '../types';
import { Board } from './Board';

interface GameProps {
  socket: WebSocket;
  playerType: Optional<Colour>;
  winner: Optional<WebSocket>;
  isActivePlayer: boolean;
}

export class Game extends React.Component<GameProps> {
  render() {
    return <Board />;
  }
}