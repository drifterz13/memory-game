import { ComponentChildren, Fragment } from "preact";
import { useState, useEffect } from "preact/hooks";
import { styled } from "goober";

import Box from "./Box";
import { animalIcons } from "../icons/index";
import Modal from "./Modal";
import { GameStatus, LOSE, STARTED, WIN } from "../type";

const BoardContainer = styled("div")`
  padding: 2em;
  background: slateblue;
  width: 650px;
  height: 650px;
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
    props.status === STARTED || props.status === LOSE
      ? "repeat(4, 1fr)"
      : "1fr"};
  grid-template-rows: ${(props) =>
    props.status === STARTED || props.status === LOSE
      ? "repeat(4, 1fr)"
      : "1fr"};
  place-items: center;
  gap: 2em;
  width: 100%;
  height: 100%;

  @media only screen and (max-width: 768px) {
    gap: 1em;
  }
`;

type Props = {
  status: GameStatus;
  start: () => void;
  setWin: () => void;
  restart: () => void;
  timeSpent: number;
  startSection: ComponentChildren;
};

const getRandomItems = () => {
  const arr = [];
  const keys = Object.keys(animalIcons);
  for (let i = 0; i < 8; i++) {
    const r = Math.floor(Math.random() * keys.length);
    const [icon] = keys.splice(r, 1);
    arr.push(icon);
  }
  return arr;
};

export default function BoardLayout(props: Props) {
  const initialState = () => {
    const items = getRandomItems();
    const count: { [key: string]: number } = {};
    const keyMap: { [key: string]: string } = {};
    for (const [index, key] of items.entries()) {
      keyMap[index] = key;
      count[key] = 0;
    }
    const shuffledItems: string[] = [];

    const updateItem = () => {
      const r = Math.floor(Math.random() * items.length);
      const item = keyMap[r];

      if (count[item] === 2) {
        return updateItem();
      }
      shuffledItems.push(item);
      count[item] += 1;
    };

    for (let i = 0; i < items.length * 2; i++) {
      updateItem();
    }
    return shuffledItems;
  };

  const [items, setItems] = useState(initialState);
  const [guessIndexes, setGuessIndexes] = useState<number[]>([]);
  const [showIndexes, setShowIndexes] = useState<number[]>([]);
  const [computing, setComputing] = useState(false);

  const DELAY = 500;

  const reset = () => {
    props.restart();
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
          props.setWin();
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

  const guess = (index: number) => {
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
    <Fragment>
      <BoardContainer>
        <Board status={props.status}>
          {props.status === STARTED || props.status === LOSE
            ? items.map((item, index) => {
                const animalSVG = animalIcons[item];

                return (
                  <Box onClick={() => guess(index)}>
                    {showIndexes.includes(index) && (
                      <img src={animalSVG} alt={item} />
                    )}
                  </Box>
                );
              })
            : props.startSection}
        </Board>
      </BoardContainer>
      {props.status === LOSE && (
        <Modal
          heading="You lose! 😭"
          description={`Don't give up. Try it again!`}
          onCancel={reset}
          onClose={reset}
        />
      )}
      {props.status === WIN && (
        <Modal
          heading="You win! 🏆"
          description={`Time spent: ${props.timeSpent}s`}
          onConfirm={reset}
          onClose={reset}
        />
      )}
    </Fragment>
  );
}
