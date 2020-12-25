import { Fragment } from "preact";
import { useEffect } from "preact/hooks";
// @ts-ignore
import { useMachine } from "preact-robot";
import BoardLayout from "../components/BoardLayout";
import StartSection from "../components/StartSection";
import TimeTracking from "../components/TimeTracking";
import Loading from "../components/Loading";
import { EVENT, machine } from "../lib/gameMachine";
import Modal from "../components/Modal";

export default function Game() {
  const [current, send] = useMachine(machine);
  const { timeSpent } = current.context;

  useEffect(() => {
    console.log(current.name);
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
      {current.name === "saving" ? <Loading /> : null}
      {current.name === "failed" ? (
        <Modal
          heading="Error! 👻"
          description="Something went wrong. Please try again."
          onClose={() => send(EVENT.RESET)}
          onCancel={() => send(EVENT.RESET)}
        />
      ) : null}
    </Fragment>
  );
}
