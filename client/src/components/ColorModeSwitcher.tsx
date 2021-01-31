import {
  IconButton,
  IconButtonProps, Tooltip, useColorMode,
  useColorModeValue
} from '@chakra-ui/react';
import * as React from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';

type ColorModeSwitcherProps = Omit<IconButtonProps, 'aria-label'>

export const ColorModeSwitcher: React.FC<ColorModeSwitcherProps> = (props) => {
  const { toggleColorMode } = useColorMode();
  const text = useColorModeValue('dark', 'light');
  const SwitchIcon = useColorModeValue(FaMoon, FaSun);
  const labelText = `Switch to ${text} mode`;

  return (
    <Tooltip label={labelText} aria-label={labelText}>
      <IconButton
      size="md"
      fontSize="lg"
      variant="ghost"
      color="current"
      marginLeft="2"
      onClick={toggleColorMode}
      icon={<SwitchIcon />}
      aria-label={labelText}
      {...props}
    />
    </Tooltip>
  );
};
