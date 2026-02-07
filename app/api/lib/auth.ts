import Prisma from "../lib/prisma"
import {prismaAdapter} from "better-auth/adapters/prisma"
import {betterAuth} from "better-auth"

const normalizeUrl = (url?: string) => {
  if (!url) return undefined;
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }
  return `https://${url}`;
};

const baseURL =
  normalizeUrl(process.env.BETTER_AUTH_URL) ||
  normalizeUrl(process.env.NEXT_PUBLIC_BETTER_AUTH_URL) ||
  normalizeUrl(process.env.NEXT_PUBLIC_APP_URL) ||
  normalizeUrl(process.env.NEXT_PUBLIC_BASE_URL) ||
  normalizeUrl(process.env.NEXT_PUBLIC_SITE_URL) ||
  normalizeUrl(process.env.VERCEL_URL) ||
  normalizeUrl(process.env.NEXT_PUBLIC_VERCEL_URL);

export const auth = betterAuth({
  baseURL,
  database: prismaAdapter(Prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },
});
