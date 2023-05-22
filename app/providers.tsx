'use client'

import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider } from '@chakra-ui/react'
import { WalletProviders } from '@/components/WalletProviders'
import { PropsWithChildren } from 'react'

export function Providers({ children }: PropsWithChildren) {
  return (
    <CacheProvider>
      <ChakraProvider>
        <WalletProviders>{children}</WalletProviders>
      </ChakraProvider>
    </CacheProvider>
  )
}
