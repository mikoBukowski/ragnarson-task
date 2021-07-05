import { Container } from "../components/Container"
import { useEffect, useState } from "react"
import {
  Flex,
  Heading,
  VStack,
  Image,
  Button,
  Spacer,
} from "@chakra-ui/react"
import Link from "next/link"
import axios from 'axios'

const Index = () => {
  const [data, setData] = useState([0])
  const [dice, setDice] = useState(null)
  const [userChoice, setUserChoice] = useState(null)
  const [score, setScore] = useState(0)
  const [round, setRound] = useState(0)
  const [gameResults, setGameResults] = useState([null])
  const [isError, setIsError] = useState(false)
  const endpoint = "https://dice-api.genzouw.com/v1/dice"
  // const endpoint = "http://roll.diceapi.com/json/d6"
  // changed to this specific endpoint due to cors policy, HTTPS does the trick // .then(payload => data.push(payload.dice[0].value))  

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);

      try {
        const result = await axios(endpoint)
        setData(result.data)
        setDice(result.data.dice)
        round === 0 ? null : checkResults(result.data.dice)
      } 
      catch (error) {
        setIsError(true)
      }
    }
    fetchData()
    resetScore()
  }, [round])
  
  const checkResults = (currentDice) => {
    console.log(`'CURRENT DICE - ${currentDice}'`)
    console.log(`'PREVIOUS DICE - ${dice}'`)
    console.log(`'USERS CHOICE - ${userChoice}'`)

    if (userChoice) {
        dice <= currentDice ? 
        (setScore(score + 0.1), alert('You receive 0.1 points')) : null
    } else {
        dice >= currentDice ? 
        (setScore(score + 0.1), alert('You receive 0.1 points')) : null
    }
  }

  const handleClick = () => { 
    setRound(round + 1)
  }

  const resetScore = () => {
    if (round >= 31) {
      setRound(0);
      setData(0)
      setDice(null);
      setScore(0);
      alert("GAME OVER");
    }
  }
  
  return (
    <>
      <Container>
        <VStack
          h={["88%", "80%", "75%", "68%"]}
          w={["99%", "80%", "75%", "50%"]}
          borderRadius={10}
          boxShadow="dark-lg"
          justifyContent="space-evenly"
          bgGradient="linear(to-tr, teal.300,blue.400)"
        >
          <Flex
            h="8vh"
            w="100%"
            alignItems="center"
            justifyContent="space-evenly"
          >
            <Flex>Score {score.toFixed(1)}</Flex>
            <Link href="/history">
              <Button
                p={"9"}
                borderRadius="full"
                bgGradient="linear(to-tr, teal.300,yellow.400)"
                boxShadow="rgb(0 0 0 /12%) 0 6px 16px"
                fontWeight={700}
                fontSize={"xl"}
                data={gameResults}
              >
                Game <br></br> Results
              </Button>
            </Link>
            <Flex>Round {round}</Flex>
          </Flex>
          
          {isError && <div>Something went wrong ...</div>}
          
          <Image
            h={200}
            w={200}
            src={`/dice/${data.dice}.png`}
            borderRadius={28}
            alt={dice}
            fallbackSrc={`/dice/0.png`}
          />

          <Heading
            fontWeight={700}
            fontSize={{ base: "5xl", md: "8xl" }}
            textShadow="rgb(0 0 0 /12%) 0 6px 16px"
          >
            Roll the dice!
          </Heading>

          <Flex h="12%" w="100%" justifyContent="space-evenly">
            <Button
              p={"9"}
              borderRadius="full"
              bgGradient="linear(to-tr, teal.300,yellow.400)"
              boxShadow="rgb(0 0 0 /12%) 0 6px 16px"
              fontWeight={700}
              fontSize={"xl"}
              onClick={() =>
                handleClick(setUserChoice(true))
              }
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
                handleClick(setUserChoice(false))
              }
            >
              Lower
            </Button>
          </Flex>
        </VStack>
      </Container>
    </>
  );
};
export default Index;
