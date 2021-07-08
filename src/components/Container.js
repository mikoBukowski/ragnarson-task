import { Flex, useColorMode } from '@chakra-ui/react'

export const Container = (props) => {

  return (
    <Flex
      h="100vh"
      w="100vw"
      direction="column"
      alignItems="center"
      justifyContent="center"
      bgColor="#16161D"
      {...props}
    />
  )
}
