'use client';

// Use the same auth client pattern as fractional.quest
import { createAuthClient } from '@neondatabase/auth/next';

export const authClient = createAuthClient();

// Re-export UI components from neon-js wrapper
export {
  NeonAuthUIProvider,
  AuthView,
  UserButton,
  SignedIn,
  SignedOut,
  useAuthData,
  useAuthenticate,
} from '@neondatabase/neon-js/auth/react';
