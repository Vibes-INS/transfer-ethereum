'use client'

import { useAccount } from 'wagmi'
import { Flex } from '@chakra-ui/react'
import { redirect } from 'next/navigation'
import { routePath } from '@/constants/RoutePath'
import { NavigationBar } from '@/components/NavigationBar'
import { useIsClient } from '@/hooks/useIsClient'
import { Transfer } from '@/components/Transfer'

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
      >
        {<Transfer />}
      </Flex>
    </>
  )
}
