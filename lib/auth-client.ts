// lib/auth-client.ts
import { createAuthClient } from "better-auth/react";

const baseURL =
  process.env.NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_AUTH_DEV_BASE_URL
    : process.env.NEXT_PUBLIC_AUTH_BASE_URL;

export const authClient = createAuthClient({
  baseURL: `${baseURL}/api/auth`,
});
