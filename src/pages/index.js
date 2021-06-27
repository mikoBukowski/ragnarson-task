import { Container } from '../components/Container'
import { useEffect, useCallback, setState, useState } from 'react'
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
  const [currentValue, setCurrentValue] = useState(0)
  const [matchHistory, setMatchHistory] = useState([])
  const [roundCounter, setRoundCounter] = useState(1)
  const [pointsCounter, setPointsCounter] = useState(0)
  const endpoint = "http://roll.diceapi.com/json/d6"

  const fetchData = useCallback(() => {
    fetch(endpoint)
      .then((blob) => blob.json())
      .then(payload => matchHistory.push(payload.dice[0].value))
      //get latest element from an array
      .then(payload =>
         setCurrentValue(matchHistory[matchHistory.length -1]))
  }, [])

  console.log(matchHistory)
  console.log(currentValue)

  if (roundCounter >= 31) {
    setRoundCounter(1)
    alert('GAME OVER')
  }
  
  useEffect(() => {
    fetchData()
  }, [fetchData])

  return (
    <>
      <Container>
        <VStack
          h={['92%', '80%', '75%', '68%']}
          w={['99%', '80%', '75%', '50%']}
          borderRadius={10}
          boxShadow="dark-lg"
          justifyContent="space-around"
          bgGradient="linear(to-tr, teal.300,blue.400)" 
          >
          <Flex
            h="8vh"
            w="100%"
            alignItems="center"
            justifyContent="space-around"
            >
            <Flex
            >Points {pointsCounter}</Flex>
            <Link href="/history">
              <Button
                data={matchHistory}
              >History</Button>
            </Link>
            <Flex
            >Round {roundCounter}</Flex>
          </Flex>

          <Image
            h={200}
            w={200}
            src={"/logo-ams.png"}
            border="1px"
            borderRadius={10}
          />

          <Flex>
            Ilość oczek: {currentValue}
          </Flex>
          
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
              onClick={() => 
                fetchData(setRoundCounter(roundCounter + 1))}
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
              onClick={() => 
                fetchData(setRoundCounter(roundCounter + 1))}
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
