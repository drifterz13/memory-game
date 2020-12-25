import { styled } from "goober";
import { useState } from "preact/hooks";

const StartContainer = styled("div")`
  display: flex;
  flex-direction: column;
  width: 250px;
`;

const StartButton = styled("button")`
  text-align: center;
  padding: 0.5em;
  font-size: xx-large;
  background: white;
  font-weight: bold;
  cursor: ${(props) => (props.disabled ? "auto" : "pointer")};
  margin-top: 0.5em;

  &:hover {
    background: ${(props) => (props.disabled ? "white" : "honeydew")};
  }

  @media only screen and (max-width: 768px) {
    padding: 0.75em;
    font-size: 16px;
  }
`;

const Input = styled("input")`
  height: 40px;
  padding: 0.5em;
  font-size: 16px;
`;

type Props = {
  start: (playerName: string) => void;
};

export default function StartSection(props: Props) {
  const [playerName, setPlayerName] = useState("");
  return (
    <StartContainer>
      <Input
        type="text"
        placeholder="Please insert your name."
        autofocus
        value={playerName}
        onInput={(e) => setPlayerName(e.target.value)}
      />
      <StartButton
        disabled={!playerName}
        onClick={() => props.start(playerName)}
      >
        Start Game
      </StartButton>
    </StartContainer>
  );
}
