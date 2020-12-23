import { render, h } from "preact";
import { useEffect, useState } from "preact/hooks";
import { setup } from "goober";

import BoardLayout from "./components/BoardLayout";
import Header from "./components/Header";
import TimeTracking from "./components/TimeTracking";

import { NOT_STARTED, STARTED, WIN, LOSE } from "./type";

setup(h);

export function App() {
  const [timeSpent, setTimeSpent] = useState(0);

  const [status, setStatus] = useState(NOT_STARTED);
  const setLose = () => setStatus(LOSE);
  const setWin = () => setStatus(WIN);
  const startGame = () => setStatus(STARTED);
  const restart = () => {
    setStatus(NOT_STARTED)
    setTimeSpent(0)
  };

  useEffect(() => {
    if (timeSpent === 60) {
      setLose();
    }
  }, [timeSpent]);

  console.log('STATUS', status)

  return (
    <div class="app-container">
      <Header />
      <TimeTracking status={status} setTimeSpent={setTimeSpent} />
      <BoardLayout
        status={status}
        start={startGame}
        setWin={setWin}
        restart={restart}
        timeSpent={timeSpent}
      />
    </div>
  );
}

render(<App />, document.body);
