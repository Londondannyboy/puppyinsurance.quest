import "server-only";
import { StackServerApp } from "@stackframe/stack";

// Only initialize if environment variables are properly configured
const hasStackConfig = !!(
  process.env.NEXT_PUBLIC_STACK_PROJECT_ID &&
  process.env.NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY &&
  process.env.STACK_SECRET_SERVER_KEY
);

export const stackServerApp = hasStackConfig
  ? new StackServerApp({
      tokenStore: "nextjs-cookie",
      urls: {
        afterSignIn: "/",
        afterSignUp: "/",
        afterSignOut: "/",
      },
    })
  : null;
