import { useCallback, useMemo, useState } from 'react'
import { useProvider } from '@/hooks/useProvider'
import { ethers } from 'ethers'

export function useSendTransaction<E = unknown>() {
  const [isSending, setIsSending] = useState(false)
  const provider = useProvider()
  const signer = useMemo(() => provider?.getSigner(), [provider])
  const [error, setError] = useState<E | null>(null)
  const [receipt, setReceipt] =
    useState<ethers.providers.TransactionReceipt | null>(null)

  const sendTransaction = useCallback(
    async (
      to: string,
      options?: {
        amount?: string
      }
    ) => {
      if (!signer || !provider) return
      if (isSending) return
      try {
        setIsSending(true)
        const value = options?.amount
          ? ethers.utils.parseUnits(options.amount, 'ether')
          : undefined
        const tx = await signer.sendTransaction({
          to,
          value,
        })
        const r = await tx.wait()
        setReceipt(r)
      } catch (err) {
        setError(err as E)
        setIsSending(false)
      }
    },
    [isSending, provider, signer]
  )

  const clear = useCallback(() => {
    setError(null)
    setReceipt(null)
  }, [])

  return {
    sendTransaction,
    isSending,
    error,
    receipt,
    clear,
  }
}
