import { Flex, useColorMode } from '@chakra-ui/react'

export const Container = (props) => {
  const { colorMode } = useColorMode()

  const bgColor = { light: 'gray.200', dark: 'gray.900' }
  const color = { light: 'black', dark: 'white' }
  
  return (
    <Flex
      h="100vh"
      w="100vw"
      direction="column"
      alignItems="center"
      justifyContent="center"
      bg={bgColor[colorMode]}
      color={color[colorMode]}
      {...props}
    />
  )
}
