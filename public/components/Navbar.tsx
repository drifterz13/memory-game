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

const NavTitle = styled("a")`
  grid-column: 1 / 4;
  font-weight: bold;
  text-decoration: none;
  color: black;

  @media only screen and (max-width: 768px) {
    grid-column: 1 / 3;
  }
`;

const NavLinkContainer = styled("div")`
  display: flex;
  justify-content: space-evenly;

  @media only screen and (max-width: 768px) {
    grid-column: 3 / 5;
  }
`;

const NavLink = styled("a")`
  &:hover {
    color: red;
  }
`;

export default function Navbar() {
  return (
    <Nav>
      <NavTitle href="/">SillyBrain🧠</NavTitle>
      <NavLinkContainer>
        <span>
          <NavLink href="/">Game🎮</NavLink>
        </span>
        <span>
          <NavLink href="/rank">Rank🏆</NavLink>
        </span>
      </NavLinkContainer>
    </Nav>
  );
}
