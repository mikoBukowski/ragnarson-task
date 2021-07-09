import { Container } from "../components/Container";
import { Stack } from "..//components/Stack";
import { StyledHeading } from "..//components/Heading";
import { StyledButton } from "..//components/Button";
import { useEffect, useState } from "react";
import { Flex, Image, Skeleton, Center, Text, Spacer } from "@chakra-ui/react";
import axios from "axios";

const Index = () => {
  const [data, setData] = useState([0]),
        [dice, setDice] = useState(null),
        [userChoice, setUserChoice] = useState(null),
        [score, setScore] = useState(0),
        [round, setRound] = useState(0),
        [gameResults, setGameResults] = useState([]),
        [isError, setIsError] = useState(false),
        [isLoading, setIsLoading] = useState(false),
        [display, changeDisplay] = useState("none"),
        [resume, setResume] = useState("none"),
        endpoint = "https://dice-api.genzouw.com/v1/dice"

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false)
      setIsLoading(true)

      try {
        const result = await axios(endpoint)
        setData(result.data)
        round === 0 ? null : setGameResults([
          ...gameResults,
          {
            round: round,
            score: score?.toFixed(1),
          },
        ]);
        setDice(result.data.dice)
        round === 0 ? null : checkResults(result.data.dice)
      } catch (error) {
        setIsError(true)
      } finally {
        handleLocalStorage()
      }
      setIsLoading(false)
      handleGameOver()
    };
    
    fetchData()
  }, [round, resume])

  useEffect(() => {
    setRound(JSON.parse(localStorage.getItem("round")))
    setScore(JSON.parse(localStorage.getItem("score")))
    setGameResults(JSON.parse(localStorage.getItem("gameResults")))
    handlePageReload()
  }, [])

  const handleLocalStorage = () => {
    localStorage.setItem("round", round)
    localStorage.setItem("score", score?.toFixed(1))
    localStorage.setItem("gameResults", JSON.stringify(gameResults))
  };
  
  const resetScore = () => {
    setRound(0)
    setData([0])
    setScore(0)
    setUserChoice(null)
    setGameResults([])
  };

  const handleGameOver = () => {
    if (round >= 30) {
      resetScore()
      alert(`END SCORE: ${score?.toFixed(1)}`)
    }
  };

  const handlePageReload = () => {
    if (performance) {
      if (performance.navigation.type == 1) {
        round !== 0 ? null : setResume("flex")
      }
    }
  };

  const checkResults = (currentDice) => {
    if (userChoice) {
      dice <= currentDice ? setScore(score + 0.1) : null
    } else {
      dice >= currentDice ? setScore(score + 0.1) : null
    }
  };

  const handleClick = () => {
    setRound(round + 1)
  };

  return (
    <>
      <Container>
        <Stack>
          <Flex
            h="8vh"
            w="100%"
            alignItems="center"
            justifyContent="space-evenly"
          >
            <Text fontSize={[20, 20, 30, 30 ]}>Score {score?.toFixed(1)}</Text>
            <StyledButton onClick={() => changeDisplay("flex")}>
              Game <br></br> Results
            </StyledButton>
            <Text fontSize={[20, 20, 30, 30 ]}>Round {round}</Text>
          </Flex>

          {isError && <div>Something went wrong ...</div>}

          {isLoading ? (
            <Skeleton h={200} w={200} borderRadius={28} />
          ) : (
            <Image
              h={200}
              w={200}
              src={`/dice/${data.dice}.png`}
              borderRadius={28}
              alt={dice}
              fallbackSrc={`/dice/0.png`}
            />
          )}

          <StyledHeading> Roll the dice! </StyledHeading>

          <Flex h="12%" w="100%" justifyContent="space-evenly">
            <StyledButton onClick={() => handleClick(setUserChoice(true))}>
              Higher
            </StyledButton>

            <StyledButton onClick={() => handleClick(setUserChoice(false))}>
              Lower
            </StyledButton>
          </Flex>
        </Stack>

        {/* Game results */}
        <Stack
          justifyContent="start"
          pos="fixed"
          overflowY="auto"
          display={display}
        >
          <StyledButton mt="4vh" onClick={() => changeDisplay("none")}>
            Back <br></br> to game
          </StyledButton>

          <StyledHeading> Round | Score </StyledHeading>
          {isLoading ? (
            <Center>Loading results ...</Center>
          ) : (
            <Center h="350%" w="100%" flexDir="column-reverse" flex="wrap">
              {gameResults?.map((item) => (
                <Flex
                  h="100%"
                  w="100%"
                  justifyContent="space-around"
                  key={item.key}
                > 
                  <Text fontSize={[40, 40, 40, 50 ]}>{item.round}</Text>
                  <Text fontSize={[40, 40, 40, 50 ]}>{item.score}</Text>
                </Flex>
              ))}
            </Center>
          )}
        </Stack>

        {/* Resume previous game prompt */}
        <Stack
          justifyContent="start"
          pos="fixed"
          overflowY="auto"
          display={resume}
        >
          <StyledHeading p={20}> Resume previous game? </StyledHeading>

          <Flex
            h="100vh"
            w="100%"
            alignItems="center"
            justifyContent="space-evenly"
          >
            <StyledButton onClick={() => setResume("none")}>Sure</StyledButton>

            <StyledButton
              onClick={() => {
                resetScore(), setResume("none");
              }}
            >
              No
            </StyledButton>
          </Flex>
        </Stack>
      </Container>
    </>
  );
};
export default Index;
