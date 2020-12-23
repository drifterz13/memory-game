import { styled } from "goober";
import { useState, useEffect, useRef } from "preact/hooks";

export default function TimeTracking(props) {
  const [time, setTime] = useState(60); // one minute
  const timeRef = useRef();

  useEffect(() => {
    const cleanup = () => clearInterval(timeRef.current);

    if (props.started === false && timeRef.current) {
      cleanup();
      timeRef.current = undefined;
      props.setTimeSpent(60 - time)
      console.log(`Time spent: ${60 - time}s`);
      return;
    }

    if (props.started) {
      timeRef.current = setInterval(() => {
        if (time === 0) {
          props.setTimeSpent(60)
          cleanup();
          return;
        }
        setTime((prevState) => prevState - 1);
      }, 1000);
    }

    return cleanup;
  }, [props.started, time]);

  return (
    <div>
      <TimeTrackingText>
        {props.started ? `${time} s` : "not started."}
      </TimeTrackingText>
    </div>
  );
}

const TimeTrackingText = styled("p")`
  text-align: center;
  font-weight: bold;
  font-size: larger;
`;
