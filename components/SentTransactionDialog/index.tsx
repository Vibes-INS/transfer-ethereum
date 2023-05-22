import { ethers } from 'ethers'
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
  Tooltip,
  useDisclosure,
} from '@chakra-ui/react'
import { useEffect } from 'react'
import { useNetwork } from 'wagmi'
import { truncateMiddle } from '@/libs/utils'

export interface SentTransactionDialogProps {
  receipt?: ethers.providers.TransactionReceipt | null
}

export const SentTransactionDialog: React.FC<SentTransactionDialogProps> = ({
  receipt,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const network = useNetwork()
  useEffect(() => {
    if (receipt) {
      onOpen()
    }
  }, [receipt])

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalHeader>Transfer successful</ModalHeader>
        <ModalBody>
          {receipt ? (
            <Text>
              {'Transaction Hash: '}
              <Tooltip label={receipt.transactionHash}>
                <Box as="strong">{truncateMiddle(receipt.transactionHash)}</Box>
              </Tooltip>
            </Text>
          ) : null}
        </ModalBody>
        <ModalFooter>
          {receipt ? (
            <Button
              as="a"
              colorScheme="blue"
              target="_blank"
              href={`${network.chain?.blockExplorers?.default.url}/tx/${receipt.transactionHash}`}
            >
              View in Blockchain Explorers
            </Button>
          ) : null}
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
