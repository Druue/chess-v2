import * as React from 'react';
// import { Position } from '../models/Position';
import { Colour, PieceType } from '../types';

interface PieceProps {
  type: PieceType;
  colour: Colour;
  // position: Position;
  icon?: any
}

export class Piece extends React.Component<PieceProps> {
  render() {
    return (
      <div className='piece'>
          <img
            className='chess-piece'
            src={this.props.icon}
            alt={`${this.props.colour}-${this.props.type}`}
          />
      </div>
    );
  }
}