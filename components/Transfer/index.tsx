'use client'

import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Textarea,
  VStack,
} from '@chakra-ui/react'
import { useState } from 'react'
import { Link } from '@chakra-ui/next-js'
import { GOERLI_FAUCET_URL } from '@/constants/env'
import { limitToNumericString, isPrimitiveEthAddress } from '@/libs/utils'
import { useTransferEth } from '@/hooks/useTransferEth'

export const Transfer = () => {
  const [address, setAddress] = useState('')
  const [amount, setAmount] = useState('')

  const isValidAddress = isPrimitiveEthAddress(address)
  const { onSubmit, isSubmitting, receipt, error } = useTransferEth()

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
        >
          Goerli Facuet
        </Button>
      </HStack>
      <FormControl isRequired>
        <FormLabel>To Address</FormLabel>
        <Textarea
          value={address}
          onChange={(e) => setAddress(e.target.value)}
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
