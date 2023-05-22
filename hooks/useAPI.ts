import { useNetwork } from 'wagmi'
import { useMemo } from 'react'
import {
  GOERLI_API_ETHERSCAN_KEY,
  GOERLI_API_SERVER,
  POLYGON_API_ETHERSCAN_KEY,
  POLYGON_API_SERVER,
} from '@/constants/env'
import { API } from '@/api'

export const useAPI = () => {
  const network = useNetwork()
  const { baseURL, apiKey } = useMemo(() => {
    const goerli = {
      baseURL: GOERLI_API_SERVER,
      apiKey: GOERLI_API_ETHERSCAN_KEY,
    }
    return (
      {
        Goerli: goerli,
        Polygon: {
          baseURL: POLYGON_API_SERVER,
          apiKey: POLYGON_API_ETHERSCAN_KEY,
        },
      }[network.chain?.name || 'Goerli'] || goerli
    )
  }, [network.chain?.name])
  return useMemo(() => new API(baseURL, apiKey), [baseURL])
}
