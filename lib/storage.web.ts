// Web-only storage — Metro automatically uses this file for the web build.
// AsyncStorage is NOT imported here, so it never reaches the web bundle.
//
// - Browser:    window.localStorage (sync — Supabase auth supports this)
// - SSR (Node): no-op fallback — session restores when client hydrates

type Storage = {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
};

const ssrNoop: Storage = {
  getItem: () => null,
  setItem: () => {},
  removeItem: () => {},
};

export const storage: Storage =
  typeof window !== 'undefined' && window.localStorage
    ? window.localStorage
    : ssrNoop;
