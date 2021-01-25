import React from 'react';
import { BrowserRouter as ReactRouter, Route } from 'react-router-dom';
import { Home, Play } from './pages/';

export const Router: React.FC = () => {
    return (
      <ReactRouter>
        <Route exact path='/' component={Home}/>
        <Route exact path='/play' component={Play}/>
      </ReactRouter>
    );
};