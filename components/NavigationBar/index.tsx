'use client'

import { Box, Flex, Heading } from '@chakra-ui/react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useIsClient } from '@/hooks/useIsClient'

export const NavigationBar: React.FC = () => {
  const isClient = useIsClient()
  return (
    <Flex
      w="full"
      justify="space-between"
      px={8}
      pos="fixed"
      top="0"
      left="0"
      h="60px"
      align="center"
      bg="white"
      shadow="lg"
    >
      <Box>
        <Heading fontSize="lg">Transfer</Heading>
      </Box>
      <Box>{isClient ? <ConnectButton /> : null}</Box>
    </Flex>
  )
}
