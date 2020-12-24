import { useMutation } from "@urql/preact";
import { Fragment } from "preact";
import { useEffect, useState } from "preact/hooks";
import BoardLayout from "../components/BoardLayout";
import StartSection from "../components/StartSection";
import TimeTracking from "../components/TimeTracking";
import { GameStatus, LOSE, NOT_STARTED, STARTED, WIN } from "../type";

const UpdateRank = `
  mutation($rank: ranks_insert_input!) {
    insert_ranks_one(object: $rank) {
      name
      time_spent
    }
  }
`;

export default function Game() {
  const [name, setName] = useState("");
  const [timeSpent, setTimeSpent] = useState(0);
  const [, updateRank] = useMutation(UpdateRank);
  const [updating, setUpdating] = useState(false);

  const [status, setStatus] = useState<GameStatus>(NOT_STARTED);
  const setLose = () => setStatus(LOSE);
  const setWin = () => {
    setStatus(WIN);
  };

  const startGame = () => setStatus(STARTED);
  const restart = () => {
    setStatus(NOT_STARTED);
    setTimeSpent(0);
    setName('')
  };

  useEffect(() => {
    // TODO: Handle this case properly.
    if (status === WIN && timeSpent !== 0) {
      if (updating) {
        return;
      }
      updateRank({ rank: { name, time_spent: timeSpent } }).then(() => {
        setUpdating(false);
      });
    }
  }, [status, timeSpent]);

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
        startSection={
          <StartSection start={startGame} name={name} setName={setName} />
        }
      />
    </Fragment>
  );
}
