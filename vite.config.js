import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  define: {
    // The footer's copyright year in the prerendered HTML (src/App.jsx Footer). The client and
    // the build-time renderer must agree on it, so it is fixed when the site is built; the
    // browser switches to the visitor's current year right after hydration.
    __BUILD_YEAR__: JSON.stringify(new Date().getFullYear()),
  },
})
