import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  // internal-tools/ is kept for reference only: not bundled, not deployed (see its README).
  // dist-ssr/ is the build-time renderer bundle (npm run build), deleted after prerendering.
  globalIgnores(['dist', 'dist-ssr', 'internal-tools']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
        __BUILD_YEAR__: 'readonly', // vite.config.js define
      },
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
    },
  },
  {
    // Vercel serverless functions run in Node, not the browser.
    files: ['api/**/*.js'],
    languageOptions: { globals: globals.node },
    rules: { 'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]', caughtErrors: 'none' }] },
  },
  {
    // The build-time renderer exports render(), not a component, and is never hot-reloaded.
    files: ['src/entry-server.jsx'],
    rules: { 'react-refresh/only-export-components': 'off' },
  },
])
