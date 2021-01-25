import { Link as ChakraLink } from '@chakra-ui/react';
import React from 'react';
import { Link as ReactLink } from 'react-router-dom';

interface LinkProps {
  text: string;
  route: string;
}

export const Link: React.FC<LinkProps> = ({text, route}) => {
    return (
      <ChakraLink
        as={ReactLink}
        color="teal.500"
        to={route}
        fontSize="2xl"
        rel="noopener noreferrer"
      >
        {text}
      </ChakraLink>
    );
};