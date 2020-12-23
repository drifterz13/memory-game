import { render, h } from "preact";
import { useState } from "preact/hooks";
import { setup } from "goober";

import BoardLayout from "./components/BoardLayout";
import Header from "./components/Header";
import TimeTracking from "./components/TimeTracking";

setup(h);

export function App() {
  const [started, setStarted] = useState(false);
  const [timeSpent, setTimeSpent] = useState(0);

  const start = () => setStarted(true);
  const stop = () => setStarted(false);

  return (
    <div class="app-container">
      <Header />
      <TimeTracking started={started} setTimeSpent={setTimeSpent} />
      <BoardLayout
        started={started}
        start={start}
        stop={stop}
        timeSpent={timeSpent}
      />
    </div>
  );
}

render(<App />, document.body);
