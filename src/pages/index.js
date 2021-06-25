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

const Index = () => {




  return (
    <>
      <Container>
        <VStack
          h={['90%', '80%', '75%', '68%']}
          w={['90%', '80%', '75%', '50%']}
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
            borderRadius={10}
            />
          
          <Heading
            fontWeight={700}
            fontSize={{ base: '5xl', md: '8xl' }}
            textShadow="rgb(0 0 0 /12%) 0 6px 16px"        
            >
            Roll the dice!
          </Heading>

          <Flex
            h="18%"
            w="100%"
            justifyContent="space-evenly"
            >
            <Button 
              p={"9"} 
              borderRadius="full" 
              bgGradient="linear(to-tr, teal.300,yellow.400)"
              boxShadow="rgb(0 0 0 /12%) 0 6px 16px"
              fontWeight={700}
              fontSize={"xl"}
              >
              Higher
            </Button>

            <Button 
              p={"9"} 
              borderRadius="full"
              bgGradient="linear(to-tr, teal.300,yellow.400)"
              boxShadow="rgb(0 0 0 /12%) 0 6px 16px"
              fontWeight={700}
              fontSize={"xl"}
              >
              Lower
            </Button>  
          </Flex>

        </VStack>
      </Container>
    </>
  )
}
export default Index
