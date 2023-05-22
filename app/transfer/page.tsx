'use client'

import { useAccount } from 'wagmi'
import { Box, Flex } from '@chakra-ui/react'
import { redirect } from 'next/navigation'
import { routePath } from '@/constants/RoutePath'
import { NavigationBar } from '@/components/NavigationBar'
import { useIsClient } from '@/hooks/useIsClient'
import { Transfer } from '@/components/Transfer'
import React from 'react'

export default function TransferPage() {
  const account = useAccount()
  const isClient = useIsClient()

  if (isClient && (!account.address || !account.isConnected)) {
    redirect(routePath.root())
  }

  return (
    <>
      <NavigationBar />
      <Flex
        as="main"
        w="full"
        h="100vh"
        pt="60px"
        justify="center"
        align="center"
        bg="linear-gradient(0deg, #ABDCFF 10%, #0396FF 100%)"
      >
        <Box
          bg="white"
          w="full"
          h={{ base: 'full', sm: 'auto' }}
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
  )
}
