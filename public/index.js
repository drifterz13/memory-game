import { render, Fragment } from "preact";
import BoardLayout from "./components/BoardLayout";
import Header from "./components/Header";

export function App() {
  return (
    <Fragment>
      <Header />
      <BoardLayout />
    </Fragment>
  );
}

render(<App />, document.body);
