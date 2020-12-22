import { useState, useEffect } from "preact/hooks";
import { styled } from "goober";

import Box from "./Box";
import { icons } from "../icons/index";

export default function BoardLayout(props) {
  const initialState = () => {
    const itemKeys = Object.keys(icons);
    const count = {};
    const keyMap = {};
    for (const [index, key] of itemKeys.entries()) {
      keyMap[index] = key;
      count[key] = 0;
    }
    const shuffledItems = [];

    const updateItem = () => {
      const r = Math.floor(Math.random() * itemKeys.length);
      const item = keyMap[r];

      if (count[item] === 2) {
        return updateItem();
      }
      shuffledItems.push(item);
      count[item] += 1;
    };

    for (let i = 0; i < itemKeys.length * 2; i++) {
      updateItem();
    }
    return shuffledItems;
  };

  const [items, setItems] = useState(initialState);
  const [guessIndexes, setGuessIndexes] = useState([]);
  const [showIndexes, setShowIndexes] = useState([]);
  const [computing, setComputing] = useState(false);

  const DELAY = 500;

  const reset = () => {
    setShowIndexes([]);
    setItems(initialState);
    setGuessIndexes([]);
  };

  useEffect(() => {
    if (guessIndexes.length === 2) {
      const item1 = items[guessIndexes[0]];
      const item2 = items[guessIndexes[1]];
      if (item1 === item2) {
        if (showIndexes.length === items.length) {
          props.stop()
          alert("You win!");
          reset();
          return;
        }
      } else {
        setComputing(true);
        setTimeout(() => {
          setShowIndexes((state) =>
            state.filter(
              (idx) => idx !== guessIndexes[0] && idx !== guessIndexes[1]
            )
          );
          setComputing(false);
        }, DELAY);
      }
      setGuessIndexes([]);
      return;
    }
  }, [guessIndexes, showIndexes]);

  const guess = (index) => {
    if (computing) {
      return;
    }
    if (showIndexes.includes(index)) {
      return;
    }
    setGuessIndexes((state) => [...state, index]);
    setShowIndexes((state) => [...state, index]);
  };

  return (
    <BoardContainer>
      <Board started={props.started}>
        {props.started ? (
          items.map((item, index) => {
            const IconComponent = icons[item];

            return (
              <Box onClick={() => guess(index)}>
                {showIndexes.includes(index) && <IconComponent />}
              </Box>
            );
          })
        ) : (
          <StartButton onClick={props.start}>Start Game</StartButton>
        )}
      </Board>
    </BoardContainer>
  );
}

const BoardContainer = styled("div")`
  padding: 2em;
  background: slateblue;
  width: 600px;
  height: 600px;
  border-radius: 4px;
  margin: 0 auto;

  @media only screen and (max-width: 768px) {
    width: 300px;
    height: 300px;
    padding: 1em;
  }
`;

const Board = styled("div")`
  display: grid;
  grid-template-columns: ${(props) =>
    props.started ? "repeat(4, 1fr)" : "1fr"};
  grid-template-rows: ${(props) => (props.started ? "repeat(4, 1fr)" : "1fr")};
  place-items: center;
  gap: 2em;
  width: 100%;
  height: 100%;

  @media only screen and (max-width: 768px) {
    gap: 1em;
  }
`;

const StartButton = styled("button")`
  text-align: center;
  padding: 1em;
  font-size: 32px;
  background: honeydew;
  font-weight: bold;
  border-radius: 25px;
  cursor: pointer;
`;
