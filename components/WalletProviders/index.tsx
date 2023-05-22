'use client'
import type { PropsWithChildren, FC } from 'react'
import { configureChains, createClient, goerli, WagmiConfig } from 'wagmi'
import {
  connectorsForWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit'
import { metaMaskWallet } from '@rainbow-me/rainbowkit/wallets'
import { useMemo } from 'react'
import { publicProvider } from 'wagmi/providers/public'
import { polygon } from 'wagmi/chains'

export const WalletProviders: FC<PropsWithChildren> = ({ children }) => {
  const { chains, provider } = useMemo(
    () => configureChains([polygon, goerli], [publicProvider()]),
    []
  )

  const walletOptions = useMemo(
    () => ({
      chains,
      appName: 'transfer-ethereum',
    }),
    [chains]
  )

  const connectors = useMemo(
    () =>
      connectorsForWallets([
        {
          groupName: 'Recommended',
          wallets: [metaMaskWallet(walletOptions)],
        },
      ]),
    [walletOptions]
  )

  const wagmiClient = useMemo(
    () =>
      createClient({
        autoConnect: true,
        connectors,
        provider,
      }),
    [connectors, provider]
  )

  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={walletOptions.chains}>
        {children}
      </RainbowKitProvider>
    </WagmiConfig>
  )
}
