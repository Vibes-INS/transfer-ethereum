import type { Address } from 'wagmi'
import { useCallback, useMemo, useState } from 'react'
import { ethers } from 'ethers'
import { erc20ABI } from 'wagmi'
import { useProvider } from '@/hooks/useProvider'
import type { TransactionResponse } from '@ethersproject/abstract-provider'

export function useSendErc20Transaction<E = unknown>() {
  const [isSending, setIsSending] = useState(false)
  const provider = useProvider()
  const signer = useMemo(() => provider?.getSigner(), [provider])
  const [error, setError] = useState<E | null>(null)
  const [receipt, setReceipt] =
    useState<ethers.providers.TransactionReceipt | null>(null)

  const sendErc20Transaction = useCallback(
    async (contractAddress: Address, to: Address, amount: string) => {
      if (isSending || !signer) return
      const contract = new ethers.Contract(contractAddress, erc20ABI, signer)
      try {
        setIsSending(true)
        const tx = (await contract.transfer(
          to,
          ethers.utils.parseUnits(amount, 'ether')
        )) as TransactionResponse
        const r = await tx.wait()
        setReceipt(r)
        setIsSending(false)
      } catch (err) {
        setError(err as E)
        setIsSending(false)
      }
    },
    [isSending, signer]
  )
  return { error, sendErc20Transaction, isSending, receipt }
}
