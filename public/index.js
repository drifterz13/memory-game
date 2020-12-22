import { render, h, Fragment } from "preact";
import { useState } from "preact/hooks";
import { setup } from "goober";

import BoardLayout from "./components/BoardLayout";
import Header from "./components/Header";
import TimeTracking from "./components/TimeTracking";
import Modal from "./components/Modal";

setup(h);

export function App() {
  const [started, setStarted] = useState(false);
  const [showWinModal, setShowWinModal] = useState(false);

  const start = () => setStarted(true);
  const stop = () => setStarted(false);

  return (
    <Fragment>
      <div class="app-container">
        <Header />
        <TimeTracking started={started} />
        <BoardLayout started={started} start={start} stop={stop} />
      </div>
      {showWinModal ? (
        <Modal>
          <h1>You Win!</h1>
        </Modal>
      ) : null}
    </Fragment>
  );
}

render(<App />, document.body);
