import { styled } from "goober";
import { useState } from "preact/hooks";

const ModalContainer = styled("div")`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: grid;
`;

const ModalContent = styled("div")`
  padding: 1em;
  background: white;
  margin: auto;
  width: 300px;
`;

const Heading = styled("h1")`
  text-align: center;
  margin-top: 0;
`;

const Description = styled("p")`
  text-align: center;
  margin-bottom: 3em;
`;

const Row = styled("div")`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 1fr;
  column-gap: 1em;
`;

const ConfirmButton = styled("button")`
  padding: 0.5em;
  color: white;
  background: slateblue;
  font-size: x-large;
  width: ${(props) => (props.fullWidth ? "100%" : "auto")};
  cursor: pointer;
`;

const CancelButton = styled("button")`
  padding: 0.5em;
  color: black;
  background: darkgrey;
  font-size: x-large;
  width: ${(props) => (props.fullWidth ? "100%" : "auto")};
  cursor: pointer;
`;

const XButton = styled("div")`
  display: grid;
  place-items: end;
  > span {
    color: red;
    padding: 4px;
    font-weight: bold;
    font-size: larger;
    cursor: pointer;
  }
`;

export default function Modal(props) {
  const [show, setShow] = useState(true);

  if (!show) {
    return null;
  }

  return (
    <ModalContainer>
      <ModalContent>
        <XButton>
          <span onClick={() => setShow(false)}>X</span>
        </XButton>
        <Heading>{props.heading}</Heading>
        <Description>{props.description}</Description>
        {props.onConfirm && props.onCancel ? (
          <Row>
            <ConfirmButton>Ok</ConfirmButton>
            <CancelButton>Cancel</CancelButton>
          </Row>
        ) : props.onConfirm ? (
          <div>
            <ConfirmButton fullWidth>Ok</ConfirmButton>
          </div>
        ) : props.onCancel ? (
          <div>
            <CancelButton fullWidth>Cancel</CancelButton>
          </div>
        ) : null}
      </ModalContent>
    </ModalContainer>
  );
}
