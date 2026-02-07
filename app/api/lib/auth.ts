import Prisma from "../lib/prisma"
import {prismaAdapter} from "better-auth/adapters/prisma"
import {betterAuth} from "better-auth"

const baseURL =
  process.env.BETTER_AUTH_URL ||
  process.env.NEXT_PUBLIC_APP_URL ||
  process.env.NEXT_PUBLIC_BASE_URL ||
  process.env.NEXT_PUBLIC_SITE_URL;

export const auth = betterAuth({
  baseURL,
  database: prismaAdapter(Prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },
});
