import { useSyncExternalStore } from 'react';

// Pages are prerendered to HTML files at build time (scripts/prerender.mjs) and the browser then
// hydrates that HTML. The first browser render must therefore produce exactly what the build
// produced, so anything that depends on the visitor's browser (stored cookie choice, scroll
// position, today's date) has to wait until after hydration.
const noSubscribe = () => () => {};

// buildValue during the build and during hydration; getBrowserValue() from the render right after
// hydration onwards (and at once for components mounted later, e.g. after a navigation).
// getBrowserValue must return the same value each time it is called while nothing has changed.
export function useAfterHydration(getBrowserValue, buildValue) {
  return useSyncExternalStore(noSubscribe, getBrowserValue, () => buildValue);
}

const isTrue = () => true;

// false during the build and during hydration, true afterwards.
export function useHydrated() {
  return useAfterHydration(isTrue, false);
}
