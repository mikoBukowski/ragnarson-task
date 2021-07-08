import { Container } from "../components/Container";
import { Stack } from "..//components/Stack";
import { StyledHeading } from "..//components/Heading";
import { StyledButton } from "..//components/Button";
import { useEffect, useState } from "react";
import { 
  Flex,
  Image,
  Skeleton
} from "@chakra-ui/react";
import axios from "axios";

const Index = () => {
  const [data, setData] = useState([0]);
  const [dice, setDice] = useState(null);
  const [userChoice, setUserChoice] = useState(null);
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(0);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [display, changeDisplay] = useState("none");
  const [resume, setResume] = useState("none");
  const [gameResults, setGameResults] = useState({});
  const endpoint = "https://dice-api.genzouw.com/v1/dice";
  // const endpoint = "http://roll.diceapi.com/json/d6"
  // changed to this specific endpoint due to cors policy during deployment, HTTPS does the trick // .then(payload => data.push(payload.dice[0].value))

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const result = await axios(endpoint);
        setData(result.data);
        setGameResults(result.data)
        setDice(result.data.dice);
        round === 0 ? null : checkResults(result.data.dice);
        handleGameOver();
        handleLocalStorage()
      } catch (error) {
        setIsError(true);
      }
      console.log(gameResults)
      setIsLoading(false);
    };

    fetchData();
  }, [round, resume]);

  useEffect(() => {
    setRound(JSON.parse(window.localStorage.getItem("round")));
    setScore(JSON.parse(window.localStorage.getItem("score")));
    handlePageReload();
  }, []);

  const handleLocalStorage = () => {
    window.localStorage.setItem("round", round);
    window.localStorage.setItem("score", score);
  }
  
  const handleGameOver = () => {
    if (round >= 30) {
      resetScore();
      alert(`'END SCORE: ${score?.toFixed(1)}'`);
    }
  };

  const resetScore = () => {
    setRound(0);
    setData([0]);
    setScore(0);
    setUserChoice(null);
  };

  const handlePageReload = () => {
    if (window.performance) {
      if (performance.navigation.type == 1) {
        round !== 0 ? null : setResume("flex");
      }
    }
  };

  const checkResults = (currentDice) => {
    // console.log(`'CURRENT DICE - ${currentDice}'`)
    // console.log(`'PREVIOUS DICE - ${dice}'`)
    // console.log(`'USERS CHOICE - ${userChoice}'`)

    if (userChoice) {
      dice <= currentDice
        ? (setScore(score + 0.1), alert("You receive 0.1 pts"))
        : null;
    } else {
      dice >= currentDice
        ? (setScore(score + 0.1), alert("You receive 0.1 pts"))
        : null;
    }
  };

  const handleClick = () => {
    setRound(round + 1);
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
            <Flex>Score {score?.toFixed(1)}</Flex> 
            {/* ? optional chaining */}
            <StyledButton
              onClick={() => changeDisplay("flex")}
            >
              Game <br></br> Results
            </StyledButton>
            <Flex>Round {round}</Flex>
          </Flex>

          {isError && <div>Something went wrong ...</div>}

          {isLoading ? (
            <Skeleton
              h={200}
              w={200}
              borderRadius={28}
            />
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
          <StyledButton mt='4vh' onClick={() => changeDisplay("none")}>
            Back <br></br> to game
          </StyledButton>

          <StyledHeading> Game Results </StyledHeading>

          {/* TODO: ZMAPUJ WYSWIETLANIE LISTY WYNIKOW I GITARA */}

          {/* {isLoading ? (
            <div>Loading ...</div>
          ) : (
            <ul>
              {data.hits.map(item => (
                <li key={item.objectID}>
                  <a href={item.url}>{item.title}</a>
                </li>
              ))}
            </ul>
          )} */}

        </Stack>

        {/* Resume game? */}

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
                resetScore(), setResume("none")
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
