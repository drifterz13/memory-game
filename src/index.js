import {
  render,
  html,
  useState,
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
    console.log("final", itemCountMap, shuffledItems);
    return shuffledItems;
  };

  const [items, setItems] = useState(initialState);

  return html`
    <div class="board-layout">
      ${items.map(
        (item) => html` <${Box}>
          <${icons[item]} />
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
