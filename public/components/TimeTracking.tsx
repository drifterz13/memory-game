import { styled } from "goober";
import { useState, useEffect, useRef } from "preact/hooks";
import { GameStatus } from "../type";

const TimeTrackingText = styled("p")`
  text-align: center;
  font-weight: bold;
  font-size: larger;
`;

type Props = {
  status: GameStatus;
  save: (time: number) => void;
  setLose: () => void;
};

export default function TimeTracking(props: Props) {
  const [time, setTime] = useState(60); // one minute
  const timeRef = useRef<NodeJS.Timer>();

  useEffect(() => {
    const cleanup = () => clearInterval(timeRef.current);

    if (props.status === "setup") {
      setTime(60);
      return;
    }

    if (props.status === "win") {
      props.save(60 - time);
      cleanup();
      return;
    }

    if (props.status === "start") {
      timeRef.current = setInterval(() => {
        if (time === 0) {
          props.setLose();
          cleanup();
          return;
        }
        setTime((prevState) => prevState - 1);
      }, 1000);
    }

    return cleanup;
  }, [props.status, time]);

  return (
    <div>
      <TimeTrackingText>
        {props.status == "idle" || props.status === "setup"
          ? "not started."
          : `${time} s`}
      </TimeTrackingText>
    </div>
  );
}
