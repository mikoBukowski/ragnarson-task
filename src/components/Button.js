import { Button } from '@chakra-ui/react'

export const StyledButton = (props) => {
  
  return (
    <Button
      p={"9"}
      borderRadius="full"
      bgGradient="linear(to-tr, teal.300,yellow.400)"
      boxShadow="rgb(0 0 0 /12%) 0 6px 16px"
      fontWeight={700}
      fontSize={"xl"}
      {...props}
    />
  )
}