"use client";

import { useSyncExternalStore } from "react";

// Some things (localStorage, next-themes' resolved theme) only exist
// correctly once we're actually running in the browser — rendering them
// during server rendering, or even during React's very first client render
// before hydration finishes, causes a mismatch with what the server sent.
//
// useSyncExternalStore is the React-native tool for exactly this. Unlike a
// useState + useEffect combo, it doesn't trigger "setState in an effect"
// warnings, because React already expects and handles the one extra render
// this produces between the server snapshot and the client snapshot.

// The "is this the client" fact never changes once the app has mounted, so
// there's nothing to actually subscribe to — this no-op is still required,
// it's part of useSyncExternalStore's API shape, not a mistake.
function subscribe() {
  return () => {};
}

export function useIsClient() {
  return useSyncExternalStore(
    subscribe,
    () => true, // what the client sees after hydration
    () => false // what the server rendered
  );
}