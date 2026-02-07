import { createAuthClient } from "better-auth/react";

const baseURL =
  process.env.NEXT_PUBLIC_APP_URL ||
  process.env.NEXT_PUBLIC_BASE_URL ||
  process.env.NEXT_PUBLIC_SITE_URL;

export const { signIn, signOut, signUp, useSession, getSession } =
  createAuthClient({
    baseURL,
  });
