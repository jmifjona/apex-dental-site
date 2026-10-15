import { createContext } from 'react';

// Build time only: src/entry-server.jsx provides a function here, and the page's <SEO> element
// hands it the page's head (see src/seo/head.js). In the browser the value is null.
export const HeadContext = createContext(null);
