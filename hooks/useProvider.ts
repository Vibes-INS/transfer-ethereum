import { useIsClient } from '@/hooks/useIsClient'
import { useMemo } from 'react'
import { ethers } from 'ethers'
import { useNetwork } from 'wagmi'

export const useProvider = () => {
  const isClient = useIsClient()
  const network = useNetwork()
  return useMemo(
    () =>
      isClient && window.ethereum
        ? new ethers.providers.Web3Provider(
            window.ethereum as any,
            network.chain
              ? {
                  name: network.chain?.name,
                  chainId: network.chain?.id,
                }
              : undefined
          )
        : null,
    [isClient, network.chain]
  )
}
