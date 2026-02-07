import Prisma from "../lib/prisma"
import {prismaAdapter} from "better-auth/adapters/prisma"
import {betterAuth} from "better-auth"

export const auth=betterAuth({
    database:prismaAdapter(Prisma,{    
        provider:'postgresql',
    }),
    emailAndPassword:{
        enabled:true,
    }
})