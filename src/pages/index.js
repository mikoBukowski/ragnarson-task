import { Container } from '../components/Container'

import { 
  Flex, 
  Heading,
  VStack,
  Image,
  Spacer,
  Button,
  Center 
} from '@chakra-ui/react'

import Link from 'next/link'

const Index = () => (
  <>
  <Container>
    <VStack
      h={['90%', '68%']}
      w={['90%', '68%']}
      borderRadius={10}
      boxShadow="rgb(0 0 0 /12%) 0 6px 16px"
      justifyContent="space-around"
      bgGradient="linear(to-tr, teal.300,blue.400)" 
    >
      <Flex
        h="8vh"
        w="100%"
        alignItems="center"
        justifyContent="space-around"
        // border="1px"
      >
        <Flex>Points</Flex>
        <Link href="/history">
          <Button>History</Button>
        </Link>
        <Flex>Round</Flex>
      </Flex>


      <Image
        h={200}
        w={200}
        src="/logo-ams.png"
        border="1px"
      />
      
      <Heading
        fontWeight={700}
        fontSize={{ base: '4xl', md: '6xl' }}
        textShadow="rgb(0 0 0 /12%) 0 6px 16px"        
        
      >
        Roll the dice!
      </Heading>

      <Flex
        h="18%"
        w="100%"
        // alignItems="center"
        justifyContent="space-evenly"
        // border="1px"
      >
        <Button
          p={"9"}
        >
          Higher</Button>

        <Button
          p={"9"}
        >
          Lower</Button>  
      </Flex>

    </VStack>
  </Container>
  </>
)

export default Index
