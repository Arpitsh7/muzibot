import { createAuthClient } from "better-auth/react";

const normalizeUrl = (url?: string) => {
  if (!url) return undefined;
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }
  return `https://${url}`;
};

const baseURL =
  normalizeUrl(process.env.NEXT_PUBLIC_APP_URL) ||
  normalizeUrl(process.env.NEXT_PUBLIC_BASE_URL) ||
  normalizeUrl(process.env.NEXT_PUBLIC_SITE_URL) ||
  normalizeUrl(process.env.NEXT_PUBLIC_BETTER_AUTH_URL) ||
  normalizeUrl(process.env.NEXT_PUBLIC_VERCEL_URL) ||
  (typeof window !== "undefined" ? window.location.origin : undefined);

export const { signIn, signOut, signUp, useSession, getSession } =
  createAuthClient({
    baseURL,
  });
