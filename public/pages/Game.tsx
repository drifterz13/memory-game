import { useMutation } from "@urql/preact";
import { Fragment } from "preact";
import { useEffect } from "preact/hooks";
import { useMachine } from "preact-robot";
import BoardLayout from "../components/BoardLayout";
import StartSection from "../components/StartSection";
import TimeTracking from "../components/TimeTracking";
import { EVENT, machine } from "../lib/gameMachine";

const UpdateRank = `
  mutation($rank: ranks_insert_input!) {
    insert_ranks_one(object: $rank) {
      name
      time_spent
    }
  }
`;

export default function Game() {
  const [current, send] = useMachine(machine);
  const { timeSpent, playerName } = current.context;

  const [, updateRank] = useMutation(UpdateRank);

  useEffect(() => {
    console.log(current.name);
    if (current.name === "save") {
      console.log("time spent saving ..", timeSpent);
      // TODO: Add loading state for this.
      updateRank({ rank: { name: playerName, time_spent: timeSpent } });
      return;
    }
  }, [current.name]);

  return (
    <Fragment>
      <TimeTracking
        status={current.name}
        setLose={() => send(EVENT.LOSE)}
        save={(timeSpent: number) => send({ type: EVENT.SAVE, timeSpent })}
      />
      <BoardLayout
        status={current.name}
        start={() => send(EVENT.START)}
        setWin={() => send(EVENT.WIN)}
        restart={() => send(EVENT.RESET)}
        timeSpent={timeSpent}
        startSection={
          <StartSection
            start={(playerName: string) =>
              send({ type: EVENT.START, playerName })
            }
          />
        }
      />
    </Fragment>
  );
}
