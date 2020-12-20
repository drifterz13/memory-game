import {
  render,
  html,
  useState,
  useEffect,
} from "https://unpkg.com/htm/preact/standalone.module.js";

import { icons } from "./icons/index.js";

const Box = (props) => {
  return html` <div class="box" ...${props} /> `;
};

const BoardLayout = () => {
  const initialState = () => {
    const itemKeys = Object.keys(icons);
    const itemCountMap = {};
    const keyMap = {};
    for (const [index, key] of itemKeys.entries()) {
      keyMap[index] = key;
      itemCountMap[key] = 0;
    }
    const shuffledItems = [];

    for (let i = 0; i < 16; i++) {
      let rand = Math.floor(Math.random() * itemKeys.length - 1 + 1);
      let item = keyMap[rand];

      if (itemCountMap[item] === 2) {
        for (;;) {
          rand = Math.floor(Math.random() * itemKeys.length - 1 + 1);
          item = keyMap[rand];
          if (itemCountMap[item] < 2) {
            shuffledItems.push(item);
            itemCountMap[item] += 1;
            break;
          }
        }
        continue;
      }
      shuffledItems.push(item);
      itemCountMap[item] += 1;
    }
    return shuffledItems;
  };

  const [items, setItems] = useState(initialState);
  const [guessItems, setGuessItems] = useState([]);
  const [showItems, setShowItems] = useState(new Set());
  const [computing, setComputing] = useState(false);

  const DELAY = 500;

  useEffect(() => {
    if (showItems.size === 16) {
      setShowItems(new Set());
      setItems(initialState);
      console.log("You win!");
    }
  }, [showItems]);

  useEffect(() => {
    if (guessItems.length === 2) {
      const item1 = items[guessItems[0]];
      const item2 = items[guessItems[1]];
      if (item1 === item2) {
        console.log("matched");
        setShowItems((state) => {
          let newState = state;
          newState.add(guessItems[0]);
          newState.add(guessItems[1]);
          return new Set(newState);
        });
      } else {
        console.log("not matched");
        setComputing(true);
        setTimeout(() => {
          setShowItems((state) => {
            let newState = state;
            newState.delete(guessItems[0]);
            newState.delete(guessItems[1]);
            return new Set(newState);
          });
          setComputing(false);
        }, DELAY);
      }
      setGuessItems([]);
      return;
    }
  }, [guessItems]);

  const guess = (index) => {
    if (computing) {
      return;
    }
    if (showItems.has(index)) {
      return;
    }
    setGuessItems((state) => [...state, index]);
    setShowItems((state) => {
      const newState = state;
      newState.add(index);
      return new Set(newState);
    });
  };

  return html`
    <div class="board-layout">
      ${items.map(
        (item, index) => html` <${Box} onClick=${() => guess(index)}>
          ${showItems.has(index) && html` <${icons[item]} /> `}
        <//>`
      )}
    </div>
  `;
};

render(
  html`
    <div class="board-layout-container">
      <${BoardLayout} />
    </div>
  `,
  document.body
);
