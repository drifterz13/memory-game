import { styled } from "goober";

const Overlay = styled("div")`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.75);
  display: grid;
  place-items: center;
`;

const Loader = styled("div")`
  border: 14px solid lightgray;
  border-top: 14px solid hotpink;
  border-radius: 50%;
  width: 90px;
  height: 90px;
  animation: spin .7s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export default function Loading() {
  return (
    <Overlay>
      <Loader />
    </Overlay>
  );
}
