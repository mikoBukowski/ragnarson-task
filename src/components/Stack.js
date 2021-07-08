import { VStack } from '@chakra-ui/react'

export const Stack = (props) => {

  const color = { teal: 'linear(to-tr, teal.300,blue.400)' }
  
  return (
    <VStack
      h={["86%", "80%", "75%", "68%"]}
      w={["99%", "80%", "75%", "50%"]}
      borderRadius={10}
      boxShadow="dark-lg"
      justifyContent="space-evenly"
      bgGradient={color.teal}
      {...props}
    />
  )
}