import { ChakraProvider, theme } from '@chakra-ui/react';
import * as React from 'react';
import { Router } from './Routes';


export const App = () => (
  <ChakraProvider theme={theme}>
    <Router />
  </ChakraProvider>
);
