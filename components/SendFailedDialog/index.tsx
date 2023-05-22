import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import { useEffect } from 'react'

interface SendFailedDialogProps {
  error: unknown | null
}

export const SendFailedDialog: React.FC<SendFailedDialogProps> = ({
  error,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  useEffect(() => {
    if (error) {
      onOpen()
    }
  }, [error])

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalHeader>Transfer Failed</ModalHeader>
        <ModalBody>
          <Text>Error Detail: </Text>
          <Box
            w="full"
            h="200px"
            overflow="auto"
            border="1px solid"
            borderColor="gray.200"
            rounded="lg"
            px={4}
            py={2}
            mt={4}
          >
            {`${error}`}
          </Box>
        </ModalBody>
        <ModalFooter />
      </ModalContent>
    </Modal>
  )
}
