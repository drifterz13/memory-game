import { styled } from "goober";

export default function Modal(props) {
  return (
    <ModalContainer>
      <ModalContent>{props.children}</ModalContent>
    </ModalContainer>
  );
}

const ModalContainer = styled("div")`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
`;

const ModalContent = styled("div")`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 1em;
  background: white;
  margin: auto;
  width: 300px;
  height: 200px;
`;
