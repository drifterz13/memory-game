import { css } from "goober";

const SectionClassName = () => css`
  text-align: center;
`;

const NotFound = () => (
  <section className={SectionClassName()}>
    <h1>404: Not Found</h1>
    <p>It's gone :(</p>
  </section>
);

export default NotFound;
