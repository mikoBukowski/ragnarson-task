import { Container } from '../components/Container'

import { 
  Flex, 
  Heading,
  VStack,
  Button,
} from '@chakra-ui/react'

import Link from 'next/link'

const History = () => (
  <>
  {/* <Container>
    <VStack
      border="1px"
      h={['88%', '68%']}
      w={['88%', '68%']}
      // justifyContent="space-between"
      bgGradient="linear(to-tr, teal.300,blue.400)" 
    >
      <Flex
        h="8vh"
        w="100%"
        alignItems="center"
        justifyContent="space-around"
      >
        <Link href="/">
          <Button>Back to game</Button>
        </Link>
      </Flex>

      <Heading
        fontWeight={700}
        fontSize={{ base: '4xl', md: '6xl' }}
        textShadow="rgb(0 0 0 /12%) 0 6px 16px"        
      >
        Results grid 
      </Heading>



    </VStack>
  </Container> */}

  <Container>
    <VStack
      h={['90%', '68%']}
      w={['90%', '68%']}
      borderRadius={10}
      boxShadow="rgb(0 0 0 /12%) 0 6px 16px"
      justifyContent="start"
      bgGradient="linear(to-tr, teal.300,blue.400)" 
    >
      <Flex
        h="8vh"
        w="100%"
        m={6}
        alignItems="center"
        justifyContent="space-around"
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

export default History
