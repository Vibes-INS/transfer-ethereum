import axios, { AxiosInstance } from 'axios'
import type { EtherScanAPI } from '@/models'

export class API {
  protected baseURL: string
  protected apiKey: string
  protected readonly axiosInstance: AxiosInstance

  constructor(baseURL: string, apiKey: string) {
    this.axiosInstance = axios.create({
      baseURL,
    })
    this.baseURL = baseURL
    this.apiKey = apiKey
  }

  getNormalTransactionsByAddress(
    address: string,
    {
      page = 1,
      offset = 10,
    }: {
      page?: number
      offset?: number
    } = {}
  ) {
    return this.axiosInstance.get<
      EtherScanAPI.BaseResponse<
        EtherScanAPI.GetNormalTransactionsByAddressItem[]
      >
    >('', {
      params: {
        module: 'account',
        action: 'txlist',
        address,
        page,
        offset,
        sort: 'desc',
        apikey: this.apiKey,
      },
    })
  }
}
