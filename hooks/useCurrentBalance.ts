import { useAccount, useBalance, useNetwork } from 'wagmi'
import type { Address } from 'wagmi'

export const useCurrentBalance = (options?: { token?: Address }) => {
  const account = useAccount()
  const network = useNetwork()
  return useBalance({
    address: account.address,
    chainId: network.chain?.id,
    ...(options ? options : {}),
  })
}
