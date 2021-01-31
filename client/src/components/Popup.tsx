import {
  Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

interface PopupProps {
  title: string;
  text: string;
  showButton?: boolean;
}

export const Popup: React.FC<PopupProps> = ({ 
  title, 
  text, 
  showButton = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);

  useEffect(() => {
    if (!showButton) setIsOpen(true);
  }, []);
  
  return (
    <>
      {showButton
        ? <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
        : null
      }

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontWeight="bold" mb="1rem">
              {text}
            </Text>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};