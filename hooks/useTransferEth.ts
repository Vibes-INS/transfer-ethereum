import { useCallback, useMemo, useState } from 'react'
import { useProvider } from '@/hooks/useProvider'
import { ethers } from 'ethers'

export function useTransferEth<E = unknown>() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const provider = useProvider()
  const signer = useMemo(() => provider?.getSigner(), [provider])
  const [error, setError] = useState<E | null>(null)
  const [receipt, setReceipt] =
    useState<ethers.providers.TransactionReceipt | null>(null)

  const onSubmit = useCallback(
    async (
      to: string,
      options?: {
        amount?: string
      }
    ) => {
      if (!signer || !provider) return
      if (isSubmitting) return
      try {
        setIsSubmitting(true)
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
        setIsSubmitting(false)
      }
    },
    [isSubmitting, provider, signer]
  )

  const clear = useCallback(() => {
    setError(null)
    setReceipt(null)
  }, [])

  return {
    onSubmit,
    isSubmitting,
    error,
    receipt,
    clear,
  }
}
