import { Container } from '../components/Container'

import { 
  Flex, 
  Heading,
  VStack,
  Button,
} from '@chakra-ui/react'

import Link from 'next/link'

const History = (data) => {
  console.log(data)

  return (
    <>
      <Container>
        <VStack
          h={['88%', '80%', '75%', '68%']}
          w={['99%', '80%', '75%', '50%']}
          borderRadius={10}
          boxShadow="dark-lg"
          justifyContent="start"
          bgGradient="linear(to-tr, teal.300,blue.400)" 
        >
          <Flex
            h="8vh"
            w="100%"
            m={6}
            alignItems="center"
            justifyContent="space-evenly"
          >
            <Link href="/">
              <Button>Back to game</Button>
            </Link>
          </Flex>
          
          <Heading
            fontWeight={700}
            fontSize={{ base: '5xl', md: '8xl' }}
            textShadow="rgb(0 0 0 /12%) 0 6px 16px"        
          >
            Game Results
          </Heading>

        </VStack>
      </Container>
    </>
  )
}

export default History
