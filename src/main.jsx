import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { HeadContext } from "./seo/context.js";
import "./index.css";

// Must match the tree in src/entry-server.jsx (HeadContext is null here: the browser does not
// collect head tags, the SEO component applies them).
const app = (
  <React.StrictMode>
    <HeadContext.Provider value={null}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HeadContext.Provider>
  </React.StrictMode>
);

const rootElement = document.getElementById("root");
// Built pages arrive prerendered (scripts/prerender.mjs): take over that HTML instead of
// rebuilding it. The dev server (npm run dev) serves an empty #root, so render from scratch there.
if (rootElement.hasChildNodes()) {
  ReactDOM.hydrateRoot(rootElement, app);
} else {
  ReactDOM.createRoot(rootElement).render(app);
}
