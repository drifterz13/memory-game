import { styled } from "goober";
import { useState } from "preact/hooks";

const ModalContainer = styled("div")`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
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

const ModalButton = styled("button")`
  padding: 0.5em;
  font-size: x-large;
  width: ${(props) => (props.fullWidth ? "100%" : "auto")};
  cursor: pointer;
`;

const ConfirmButton = styled(ModalButton)`
  color: white;
  background: slateblue;
`;

const CancelButton = styled(ModalButton)`
  color: black;
  background: darkgrey;
`;

const XContainer = styled("div")`
  display: grid;
  place-items: end;
`;

const XText = styled("span")`
  color: red;
  padding: 4px;
  font-weight: bold;
  font-size: larger;
  cursor: pointer;
`;

export default function Modal(props) {
  const [show, setShow] = useState(true);

  if (!show) {
    return null;
  }

  return (
    <ModalContainer>
      <ModalContent>
        <XContainer>
          <XText onClick={() => setShow(false)}>X</XText>
        </XContainer>
        <Heading>{props.heading}</Heading>
        <Description>{props.description}</Description>
        {props.onConfirm && props.onCancel ? (
          <Row>
            <ConfirmButton onClick={props.onConfirm}>Ok</ConfirmButton>
            <CancelButton onClick={props.onCancel}>Cancel</CancelButton>
          </Row>
        ) : props.onConfirm ? (
          <div>
            <ConfirmButton fullWidth onClick={props.onConfirm}>
              Ok
            </ConfirmButton>
          </div>
        ) : props.onCancel ? (
          <div>
            <CancelButton fullWidth onClick={props.onCancel}>
              Close
            </CancelButton>
          </div>
        ) : null}
      </ModalContent>
    </ModalContainer>
  );
}
