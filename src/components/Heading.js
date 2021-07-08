import { Heading } from '@chakra-ui/react'

export const StyledHeading = (props) => {
  
  return (
    <Heading
      fontWeight={700}
      fontSize={{ base: "5xl", md: "8xl" }}
      textShadow="rgb(0 0 0 /12%) 0 6px 16px"
      {...props}
    />
  )
}