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
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { Link } from '@chakra-ui/next-js'
import { GOERLI_FAUCET_URL } from '@/constants/env'
import { limitToNumericString, isPrimitiveEthAddress } from '@/libs/utils'
import { useTransferEth } from '@/hooks/useTransferEth'
import { useCurrentBalance } from '@/hooks/useCurrentBalance'
import type { Address } from 'wagmi'
import { useIsClient } from '@/hooks/useIsClient'

export const Transfer = () => {
  const [address, setAddress] = useState<Address>('' as Address)
  const [amount, setAmount] = useState('')
  const [erc20TokenContractAddress, setERC20TokenContractAddress] = useState('')
  const isClient = useIsClient()

  const isValidAddress = isPrimitiveEthAddress(address)
  const { onSubmit, isSubmitting, receipt, error } = useTransferEth()

  const { data, error: getBalanceError } = useCurrentBalance({
    token: isPrimitiveEthAddress(erc20TokenContractAddress)
      ? (erc20TokenContractAddress as Address)
      : undefined,
  })

  return (
    <VStack direction="column" spacing="8" w="full" maxW="500px" px={6}>
      <HStack w="full" spacing="6">
        <Button variant="link" as={Link} href="/history" colorScheme="blue">
          Transfer History
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
      <FormControl isRequired>
        <FormLabel>To Address</FormLabel>
        <Textarea
          value={address}
          onChange={(e) => setAddress(e.target.value as Address)}
          resize="none"
          placeholder="Please enter an Ethereum address"
        />
      </FormControl>
      <FormControl>
        <FormLabel>Amount</FormLabel>
        <Input
          value={amount}
          onChange={(e) => setAmount(limitToNumericString(e.target.value))}
          placeholder="Please enter a number"
        />
      </FormControl>
      <FormControl>
        <FormLabel>ERC20 Token Contract Address</FormLabel>
        <Input
          value={erc20TokenContractAddress}
          onChange={(e) => setERC20TokenContractAddress(e.target.value)}
          placeholder="Please enter an Ethereum address"
        />
        {getBalanceError ? (
          <Box mt={2} color="red.600" h="56px">
            The token was not found
          </Box>
        ) : (
          <VStack mt={2} align="start">
            <Box>
              TokenName: <Box as="strong">{isClient ? data?.symbol : null}</Box>
            </Box>
            <Box>
              Balance:{' '}
              <Box as="strong">{isClient ? data?.formatted : null}</Box>
            </Box>
          </VStack>
        )}
      </FormControl>
      <FormControl>
        <Button
          type="submit"
          colorScheme="blue"
          w="full"
          isDisabled={!isValidAddress}
          isLoading={isSubmitting}
          onClick={() => {
            onSubmit(address, {
              amount,
            })
          }}
        >
          Submit
        </Button>
      </FormControl>
    </VStack>
  )
}
