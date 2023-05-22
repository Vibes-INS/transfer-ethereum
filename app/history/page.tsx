'use client'

import useSWR from 'swr'
import { useAccount, useNetwork, useSwitchNetwork } from 'wagmi'
import { useAPI } from '@/hooks/useAPI'
import React, { useMemo, useState } from 'react'
import { NavigationBar } from '@/components/NavigationBar'
import {
  Box,
  Button,
  Center,
  Flex,
  Select,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tooltip,
  Tr,
} from '@chakra-ui/react'
import { truncateMiddle } from '@/libs/utils'
import { redirect } from 'next/navigation'
import { routePath } from '@/constants/RoutePath'
import { useIsClient } from '@/hooks/useIsClient'
import { useNonce } from '@/hooks/useNonce'
import { ethers } from 'ethers'
import { QueryKey } from '@/constants/QueryKey'
import { Link } from '@chakra-ui/next-js'

export default function HistoryPage() {
  const api = useAPI()
  const account = useAccount()
  const isClient = useIsClient()

  if (isClient && (!account.address || !account.isConnected)) {
    redirect(routePath.root())
  }
  const nonce = useNonce()
  const network = useNetwork()
  const [page, setPage] = useState(1)
  const offset = 10
  const { data, isLoading } = useSWR(
    [QueryKey.History, account.address, page, api, network.chain, nonce],
    async () => {
      if (!account.address) return null
      return await api
        .getNormalTransactionsByAddress(account.address, { page, offset })
        .then((res) => res.data)
    },
    {
      revalidateOnReconnect: false,
      revalidateOnFocus: false,
      refreshWhenHidden: false,
      refreshWhenOffline: false,
    }
  )

  const pageOptions = useMemo(
    () =>
      new Array(nonce < 10 ? 1 : Math.max(Math.ceil(nonce / offset), 1) + 1)
        .fill(0)
        .map((_, i) => i + 1),
    [nonce, offset]
  )

  return (
    <>
      <NavigationBar />
      <Flex
        as="main"
        w="full"
        minH="100vh"
        pt="60px"
        justify="center"
        align="center"
      >
        <Box
          bg="white"
          w="full"
          h="auto"
          maxW="800px"
          p="8"
          rounded="lg"
          shadow={{ base: 'none', md: 'xl' }}
          transition="200ms"
          pos="relative"
          minH={{ base: 'full', md: '500px' }}
          pt="20"
        >
          <Button
            as={Link}
            href={routePath.transfer()}
            variant="link"
            pos="absolute"
            top="8"
            left="8"
          >
            Back to Transfer Page
          </Button>
          {isLoading ? (
            <Center
              pos="absolute"
              top="0"
              left="0"
              w="full"
              h="full"
              pointerEvents="none"
            >
              <Spinner />
            </Center>
          ) : null}
          <TableContainer h="580px">
            <Table variant="simple">
              {!isLoading ? (
                <>
                  <Thead>
                    <Tr>
                      <Th>Transaction Hash</Th>
                      <Th>Block</Th>
                      <Th>To</Th>
                      <Th>Value</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {isClient
                      ? data?.result.map((item) => {
                          let value = ethers.utils.formatEther(item.value)
                          value = value === '0.0' ? '0' : value
                          return (
                            <Tr
                              data-nonce={item.nonce}
                              key={item.nonce}
                              h="44px"
                              borderBottom="1px"
                              borderBottomColor="gray.200"
                            >
                              <Td>
                                <Button
                                  as="a"
                                  variant="link"
                                  target="_blank"
                                  href={`${network.chain?.blockExplorers?.default.url}/tx/${item.hash}`}
                                  colorScheme="blue"
                                >
                                  {truncateMiddle(item.hash)}
                                </Button>
                              </Td>
                              <Td>{item.blockNumber}</Td>
                              <Td>
                                <Tooltip label={item.to} hasArrow>
                                  <Box as="span">{truncateMiddle(item.to)}</Box>
                                </Tooltip>
                              </Td>
                              <Td>
                                <Tooltip label={value} hasArrow>
                                  <Box
                                    as="span"
                                    w="50px"
                                    textOverflow="ellipsis"
                                    overflow="hidden"
                                    noOfLines={1}
                                    display="block"
                                  >
                                    {value}
                                  </Box>
                                </Tooltip>
                              </Td>
                            </Tr>
                          )
                        })
                      : null}
                  </Tbody>
                </>
              ) : null}
            </Table>
          </TableContainer>
          {pageOptions.length >= 1 ? (
            <Flex justify="end" lineHeight="40px">
              Page:
              <Select
                w="150px"
                ml="2"
                value={page}
                onChange={(e) => setPage(Number(e.target.value))}
              >
                {pageOptions.map((p) => (
                  <option value={p} key={p}>
                    {p}
                  </option>
                ))}
              </Select>
            </Flex>
          ) : null}
        </Box>
      </Flex>
    </>
  )
}
