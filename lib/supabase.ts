import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';
import { storage } from './storage';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing Supabase env vars. Check that .env exists in project root and has ' +
      'EXPO_PUBLIC_SUPABASE_URL and EXPO_PUBLIC_SUPABASE_ANON_KEY. ' +
      'After editing .env, fully restart the dev server.'
  );
}

// True ONLY during Node SSR (Vercel's static export pre-render).
//   - Browser:        has window           → false
//   - React Native:   no process.versions.node → false
//   - Vercel SSR:     no window, has process.versions.node → true
//
// During SSR we disable session persistence + auto-refresh because they
// trigger storage reads inside Supabase's GoTrueClient init flow that
// cannot be intercepted by the storage adapter alone. Session restores
// when the client hydrates in the browser.
const isNodeSSR =
  typeof window === 'undefined' &&
  typeof process !== 'undefined' &&
  typeof process.versions !== 'undefined' &&
  typeof process.versions.node === 'string';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage,
    autoRefreshToken: !isNodeSSR,
    persistSession: !isNodeSSR,
    detectSessionInUrl: false,
  },
});
