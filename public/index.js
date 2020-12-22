import { render } from "preact";
import BoardLayout from "./components/BoardLayout";
import Header from "./components/Header";

export function App() {
  return (
    <div class="app-container">
      <Header />
      <BoardLayout />
    </div>
  );
}

render(<App />, document.body);
