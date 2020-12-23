import { styled } from "goober";

const Nav = styled("nav")`
  padding: 1em;
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: repeat(4, 1fr);
  font-size: x-large;

  @media only screen and (max-width: 768px) {
    font-size: large;
    padding: 0.5em;
  }
`;

const NavTitle = styled("span")`
  grid-column: 1 / 4;
  font-weight: bold;

  @media only screen and (max-width: 768px) {
    grid-column: 1 / 3;
  }
`;

const NavLinkContainer = styled("div")`
  display: flex;
  justify-content: space-around;

  @media only screen and (max-width: 768px) {
    grid-column: 3 / 5;
  }
`;

export default function Navbar() {
  return (
    <Nav>
      <NavTitle>SillyBrain🧠</NavTitle>
      <NavLinkContainer>
        <span>
          <a href="/">Game🎮</a>
        </span>
        <span>
          <a href="/rank">Rank🏆</a>
        </span>
      </NavLinkContainer>
    </Nav>
  );
}
