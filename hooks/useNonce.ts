import { useState } from 'react'
import { useProvider } from '@/hooks/useProvider'
import useSWR from 'swr'
import { useAccount, useNetwork } from 'wagmi'

export const useNonce = () => {
  const [nonce, setNonce] = useState(0)
  const provider = useProvider()
  const account = useAccount()
  const network = useNetwork()
  useSWR(['query_nonce', account.address, provider, network.chain], () => {
    if (!account.address || !provider) return null
    provider.getTransactionCount(account.address).then((r) => setNonce(r))
  })
  return nonce
}
