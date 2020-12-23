import { styled } from "goober";
import { useState, useEffect, useRef } from "preact/hooks";
import { NOT_STARTED, STARTED, WIN } from "../type";

const TimeTrackingText = styled("p")`
  text-align: center;
  font-weight: bold;
  font-size: larger;
`;

export default function TimeTracking(props) {
  const [time, setTime] = useState(60); // one minute
  const timeRef = useRef();

  useEffect(() => {
    const cleanup = () => clearInterval(timeRef.current);

    if (props.status === NOT_STARTED) {
      setTime(60);
      return;
    }

    if (props.status === WIN) {
      props.setTimeSpent(60 - time);
      console.log(`Time spent: ${60 - time}s`);
      cleanup();
      return;
    }

    if (props.status === STARTED) {
      timeRef.current = setInterval(() => {
        if (time === 0) {
          props.setTimeSpent(60);
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
        {props.status == NOT_STARTED ? "not started." : `${time} s`}
      </TimeTrackingText>
    </div>
  );
}
