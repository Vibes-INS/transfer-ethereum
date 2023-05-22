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
      backdropBlur="20px"
      transform="translate3d(0, 0, 0)"
      zIndex={2}
    >
      <Box display={{ base: 'none', sm: 'block' }}>
        <Heading fontSize="lg" color="white">
          Transfer
        </Heading>
      </Box>
      <Flex justify="center" w={{ base: 'full', sm: 'auto' }}>
        {isClient ? <ConnectButton /> : null}
      </Flex>
    </Flex>
  )
}
