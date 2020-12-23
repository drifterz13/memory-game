import { styled } from "goober";

export default function Header() {
  return (
    <StyledHeader>
      <h1>Silly Brain 🧠🦕</h1>
    </StyledHeader>
  );
}

const StyledHeader = styled("div")`
  text-align: center;
  font-size: x-large;

  @media only screen and (max-width: 768px) {
    /* For mobile phones: */
    font-size: medium;
  }
`;
