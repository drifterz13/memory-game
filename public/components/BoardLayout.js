import { useState, useEffect } from "preact/hooks";
import { Box } from "./Box";

import { icons } from "../icons/index";

export function BoardLayout() {
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
    <div class="board-layout">
      {items.map((item, index) => {
        const IconComponent = icons[item];

        return (
          <Box onClick={() => guess(index)}>
            {showIndexes.includes(index) && <IconComponent />}
          </Box>
        );
      })}
    </div>
  );
}
