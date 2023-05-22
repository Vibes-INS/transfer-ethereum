'use client'

import { useAccount } from 'wagmi'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { Center } from '@chakra-ui/react'
import { redirect } from 'next/navigation'
import { routePath } from '@/constants/RoutePath'
import { useIsClient } from '@/hooks/useIsClient'

export default function Home() {
  const account = useAccount()
  const isClient = useIsClient()

  if (isClient && account.isConnected && account.address) {
    redirect(routePath.transfer())
  }

  return (
    <Center w="full" h="100vh">
      <ConnectButton />
    </Center>
  )
}
