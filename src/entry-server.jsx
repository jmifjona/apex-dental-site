// Build-time renderer (Node, no browser). `npm run build` bundles this file with
// `vite build --ssr` and scripts/prerender.mjs calls render() once per public URL, writing the
// result into that page's prerendered HTML file. The browser then hydrates it (src/main.jsx).
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import App from './App';
import { HeadContext } from './seo/context.js';
import { headToHtml } from './seo/head.js';

export function render(url) {
  let head = null;
  const collectHead = (pageHead) => {
    head = pageHead;
  };
  // Same tree as src/main.jsx, with StaticRouter in place of BrowserRouter.
  const html = renderToString(
    <React.StrictMode>
      <HeadContext.Provider value={collectHead}>
        <StaticRouter location={url}>
          <App />
        </StaticRouter>
      </HeadContext.Provider>
    </React.StrictMode>,
  );
  return { html, head, headHtml: head ? headToHtml(head) : '' };
}
