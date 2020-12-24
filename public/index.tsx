import { render, h } from "preact";
import { LocationProvider, Router } from "preact-iso/router";
import lazy, { ErrorBoundary } from "preact-iso/lazy";
import { createClient, Provider } from "@urql/preact";
import { setup } from "goober";

import Navbar from "./components/Navbar";
import Game from "./pages/Game";
import NotFound from "./pages/NotFound";

const Rank = lazy(() => import("./pages/Rank"));

const client = createClient({
  url: "https://silly-brain.hasura.app/v1/graphql",
});

setup(h);

export function App() {
  return (
    // @ts-expect-error
    <Provider value={client}>
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
    </Provider>
  );
}

render(<App />, document.body);
