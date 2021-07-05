import { Container } from "../components/Container";
import { useEffect, useState } from "react";
import {
  Flex,
  Heading,
  VStack,
  Image,
  Button,
} from "@chakra-ui/react";
import Link from "next/link";
import axios from 'axios';

const Index = () => {
  const [data, setData] = useState([0]);
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [dice, setDice] = useState(0);
  const [userChoice, setUserChoice] = useState(0)
  // const endpoint = "http://roll.diceapi.com/json/d6"
  // changed to this specific endpoint due to cors policy, HTTPS does the trick // .then(payload => data.push(payload.dice[0].value))  
  const endpoint = "https://dice-api.genzouw.com/v1/dice";

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(endpoint)
      setData(result.data)
      setDice(result.data.dice)
      console.log(result.data.dice)
      // Destructuring assignment
      // const [currentDice] = result.data.slice(-1)
      // const [choice] = result.data.slice(-2) 
      
      // setUserChoice(data.slice(-1))

      setUserChoice()

    }
    // console.log(dice)
    fetchData()
    resetScore()
    round === 0 ? null : checkResults()
  }, [round])
 
  const checkResults = () => {
    // console.log('SUMUJE PKTY')
    // console.log('dice' , dice)
    //TODO ADD POINT
    // setDice(data[data.length - 1])
  }

  const handleClick = () => { 
    // console.log(userChoice, '1')
    // console.log(dice, '1')
    // setUserChoice(value)
    setRound(round + 1)
  }

  const resetScore = () => {
    if (round >= 31) {
      setRound(0);
      // wipe existing data
      data.splice(0, data.length);
      setDice(0);
      setScore(0);
      alert("GAME OVER");
    }
  }
  
  // useEffect(() => {
  //    const fetchData = async () => {
  //     await fetch(endpoint)
  //     .then((blob) => blob.json())    
  //     .then((payload) => {
  //         data.push(payload.dice)
  //         const [currentDice] = data.slice(-1)
  //         const [choice] = data.slice(-2) 
  //         // Destructuring assignment
  //         setUserChoice(choice)
  //         setDice(currentDice)
  //         console.log(userChoice, 'userChoice')
  //         console.log(dice, 'current dice')
  //         console.log('first')
  //     })
  //     .then(console.log('DRUGI'))
  //     console.log('second')
  //     resetScore()
  //     // checkResults()
    
     
  //   }
  //   round === 0 ? console.log('dupa') : checkResults()
  //   fetchData()

  //   // resetScore()
  //   // round === 0 ? console.log('dupa') : checkResults()
  //   // console.log(userChoice, '2 userChoice')
  //   // console.log(dice, '2 current dice')
  // }, [round])
  

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
              <Button data={data}>Game Results</Button>
            </Link>
            <Flex>Round {round}</Flex>
          </Flex>

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

          <Flex h="18%" w="100%" justifyContent="space-evenly">
            <Button
              p={"9"}
              borderRadius="full"
              bgGradient="linear(to-tr, teal.300,yellow.400)"
              boxShadow="rgb(0 0 0 /12%) 0 6px 16px"
              fontWeight={700}
              fontSize={"xl"}
              onClick={() =>
                handleClick()
                // setRound(round + 1)
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
                handleClick()
                // setRound(round + 1)
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
