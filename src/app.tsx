import "@unocss/reset/tailwind.css";
import "virtual:uno.css";

import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import { MetaProvider } from "@solidjs/meta";
import MetaTags from "./components/Meta";
import InkstoneMetaClient from "./components/InkstoneMetaClient";
import InkstoneTrackerClient from "./components/InkstoneTrackerClient";

export default function App() {
  return (
    <Router
      root={(props) => (
        <MetaProvider>
          <MetaTags />
          <InkstoneMetaClient />
          <InkstoneTrackerClient />
          <Suspense>{props.children}</Suspense>
        </MetaProvider>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
