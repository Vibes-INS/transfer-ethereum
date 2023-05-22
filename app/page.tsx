'use client'

import { useAccount } from 'wagmi'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { Box, Center, Flex, Spinner } from '@chakra-ui/react'
import { NavigationBar } from '@/components/NavigationBar'
import { Transfer } from '@/components/Transfer'
import React from 'react'
import { useIsClient } from '@/hooks/useIsClient'

export default function Home() {
  const account = useAccount()
  const isClient = useIsClient()

  if (!isClient)
    return (
      <Center w="full" h="100vh">
        <Spinner />
      </Center>
    )

  return (
    <Center w="full" h="100vh">
      {account.address ? (
        <>
          <NavigationBar />
          <Flex
            as="main"
            w="full"
            h="auto"
            minH="100vh"
            pt="60px"
            justify="center"
            align="center"
          >
            <Box
              bg="white"
              w="full"
              h="auto"
              minH={{ base: 'calc(100vh - 60px)', sm: 'unset' }}
              maxW="480px"
              p="8"
              rounded="lg"
              shadow={{ base: 'none', sm: 'xl' }}
              transition="200ms"
            >
              <Transfer />
            </Box>
          </Flex>
        </>
      ) : (
        <ConnectButton />
      )}
    </Center>
  )
}
