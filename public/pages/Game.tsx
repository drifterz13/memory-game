import { Fragment } from "preact";
import { useEffect, useState } from "preact/hooks";
import BoardLayout from "../components/BoardLayout";
import TimeTracking from "../components/TimeTracking";
import { GameStatus, LOSE, NOT_STARTED, STARTED, WIN } from "../type";

export default function Game() {
  const [timeSpent, setTimeSpent] = useState(0);

  const [status, setStatus] = useState<GameStatus>(NOT_STARTED);
  const setLose = () => setStatus(LOSE);
  const setWin = () => setStatus(WIN);
  const startGame = () => setStatus(STARTED);
  const restart = () => {
    setStatus(NOT_STARTED);
    setTimeSpent(0);
  };

  useEffect(() => {
    if (timeSpent === 60) {
      setLose();
    }
  }, [timeSpent]);

  return (
    <Fragment>
      <TimeTracking status={status} setTimeSpent={setTimeSpent} />
      <BoardLayout
        status={status}
        start={startGame}
        setWin={setWin}
        restart={restart}
        timeSpent={timeSpent}
      />
    </Fragment>
  );
}
