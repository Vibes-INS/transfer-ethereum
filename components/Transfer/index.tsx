'use client'

import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Textarea,
  VStack,
  Box,
  FormErrorMessage,
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { Link } from '@chakra-ui/next-js'
import { GOERLI_FAUCET_URL } from '@/constants/env'
import {
  limitToNumericString,
  isPrimitiveEthAddress,
  isValidNumber,
} from '@/libs/utils'
import { useSendTransaction } from '@/hooks/useSendTransaction'
import { useCurrentBalance } from '@/hooks/useCurrentBalance'
import type { Address } from 'wagmi'
import { useIsClient } from '@/hooks/useIsClient'
import { useSendErc20Transaction } from '@/hooks/useSendErc20Transaction'
import { SentTransactionDialog } from '@/components/SentTransactionDialog'
import { SendFailedDialog } from '@/components/SendFailedDialog'
import { routePath } from '@/constants/RoutePath'

export const Transfer = () => {
  const [address, setAddress] = useState<Address>('' as Address)
  const [amount, setAmount] = useState('')
  const [erc20TokenContractAddress, setERC20TokenContractAddress] =
    useState<Address>('' as Address)
  const isClient = useIsClient()

  const isValidAddress = isPrimitiveEthAddress(address)
  const isValidAmount = isValidNumber(amount)
  const isValidERC20TokenContractAddress = isPrimitiveEthAddress(
    erc20TokenContractAddress
  )
  const { sendTransaction, isSending, receipt, error } = useSendTransaction()
  const {
    sendErc20Transaction,
    error: erc20Error,
    isSending: isSendingErc20Token,
    receipt: erc20Receipt,
  } = useSendErc20Transaction()

  const { data, error: errorThatGetBalance } = useCurrentBalance({
    token: isValidERC20TokenContractAddress
      ? (erc20TokenContractAddress as Address)
      : undefined,
  })

  return (
    <>
      <SentTransactionDialog receipt={receipt || erc20Receipt} />
      <SendFailedDialog error={error || erc20Error} />
      <VStack direction="column" spacing="8" w="full" maxW="500px" px={6}>
        <HStack w="full" spacing="6">
          <Button
            variant="link"
            as={Link}
            href={routePath.history()}
            colorScheme="blue"
          >
            Transaction History
          </Button>
          <Button
            variant="link"
            as="a"
            href={GOERLI_FAUCET_URL}
            colorScheme="blue"
            target="_blank"
          >
            Goerli Facuet
          </Button>
        </HStack>
        <FormControl
          isRequired
          isInvalid={(address as string) !== '' && !isValidAddress}
        >
          <FormLabel>To Address</FormLabel>
          <Textarea
            value={address}
            onChange={(e) => setAddress(e.target.value as Address)}
            resize="none"
            placeholder="Please enter an Ethereum address"
          />
          <FormErrorMessage>Invalid address</FormErrorMessage>
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Amount</FormLabel>
          <Input
            value={amount}
            onChange={(e) => setAmount(limitToNumericString(e.target.value))}
            placeholder="Please enter a number"
          />
        </FormControl>
        <FormControl isInvalid={!!errorThatGetBalance}>
          <FormLabel>ERC20 Token Contract Address</FormLabel>
          <Input
            value={erc20TokenContractAddress}
            onChange={(e) =>
              setERC20TokenContractAddress(e.target.value as Address)
            }
            placeholder="Please enter an Ethereum address"
          />
          {!errorThatGetBalance ? (
            <VStack mt={2} align="start">
              <Box>
                TokenName:{' '}
                <Box as="strong">{isClient ? data?.symbol : null}</Box>
              </Box>
              <Box>
                Balance:{' '}
                <Box as="strong">{isClient ? data?.formatted : null}</Box>
              </Box>
            </VStack>
          ) : null}
          <FormErrorMessage>The token was not found</FormErrorMessage>
        </FormControl>
        <FormControl>
          <Button
            type="submit"
            colorScheme="blue"
            w="full"
            isDisabled={!isValidAddress || !isValidAmount}
            isLoading={isSending || isSendingErc20Token}
            onClick={() => {
              if (isValidERC20TokenContractAddress && !errorThatGetBalance) {
                sendErc20Transaction(erc20TokenContractAddress, address, amount)
              } else {
                sendTransaction(address, {
                  amount,
                })
              }
            }}
          >
            Submit
          </Button>
        </FormControl>
      </VStack>
    </>
  )
}
