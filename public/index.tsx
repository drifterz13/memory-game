import { render, h } from "preact";
import { LocationProvider, Router } from "preact-iso/router";
import lazy, { ErrorBoundary } from "preact-iso/lazy";
import { setup } from "goober";

import Navbar from "./components/Navbar";
import Game from "./pages/Game";
import NotFound from "./pages/NotFound";

const Rank = lazy(() => import("./pages/Rank"));

setup(h);

console.log("secret", process.env.ADMIN_SECRET);

export function App() {
  return (
    <LocationProvider>
      <div class="app-container">
        <Navbar />
        <ErrorBoundary>
          <Router>
            <Game path="/" />
            <Rank path="/rank" />
            <NotFound default />
          </Router>
        </ErrorBoundary>
      </div>
    </LocationProvider>
  );
}

render(<App />, document.body);
