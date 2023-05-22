export module EtherScanAPI {
  export interface BaseResponse<Result> {
    status: string
    message: string
    result: Result
  }

  export interface GetNormalTransactionsByAddressItem {
    blockNumber: string
    blockHash: string
    timeStamp: string
    hash: string
    nonce: string
    transactionIndex: string
    from: string
    to: string
    value: string
    gas: string
    gasPrice: string
    input: string
    methodId: string
    functionName: string
    contractAddress: string
    cumulativeGasUsed: string
    txreceipt_status: string
    gasUsed: string
    confirmations: string
    isError: string
  }
}
