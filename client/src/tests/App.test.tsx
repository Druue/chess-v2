import { screen } from '@testing-library/react';
import React from 'react';
import { App } from '../App';
import { render } from './test-utils';

test('renders play now link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Play Now!/i);
  expect(linkElement).toBeInTheDocument();
});
