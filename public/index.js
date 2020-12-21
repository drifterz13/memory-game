import { render, Fragment } from "preact";
import { BoardLayout } from "./components/BoardLayout";

export function App() {
  return (
    <Fragment>
      <section class="header-section">
        <h1>Silly Brain 🧠🦕</h1>
      </section>
      <div class="board-layout-container">
        <BoardLayout />
      </div>
    </Fragment>
  );
}

render(<App />, document.body);
