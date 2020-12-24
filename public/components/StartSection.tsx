import { styled } from "goober";
import { StateUpdater } from "preact/hooks";

const StartContainer = styled("div")`
  display: flex;
  flex-direction: column;
  width: 200px;
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
`;

type Props = {
  start: () => void;
  name: string;
  setName: StateUpdater<string>;
};

export default function StartSection(props: Props) {
  return (
    <StartContainer>
      <Input
        type="text"
        placeholder="Please insert your name."
        autofocus
        value={props.name}
        onInput={(e) => props.setName(e.target.value)}
      />
      <StartButton disabled={!props.name} onClick={props.start}>
        Start Game
      </StartButton>
    </StartContainer>
  );
}
