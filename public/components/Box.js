import { styled } from "goober";

export default function Box({ onClick, children }) {
  return (
    <StyledBox onClick={onClick}>
      {children}
    </StyledBox>
  );
}

const StyledBox = styled("div")`
  border-radius: 4px;
  width: 126px;
  height: 126px;
  color: #222;
  font-weight: bold;
  font-size: 24px;
  background: honeydew;
  display: grid;
  place-items: center;
  cursor: pointer;

  @media only screen and (max-width: 768px) {
    /* For mobile phones: */
    width: 100%;
    height: 100%;
  }
`;
