import {PrismaClient} from "../../generated/prisma/client"
import { PrismaPg } from "@prisma/adapter-pg";
const adapter=new PrismaPg({
    connectionString:process.env.DATABASE_URL
})
const globalprisma=global as unknown as{
    prisma:PrismaClient
}
const Prisma=globalprisma.prisma||new PrismaClient({
    adapter
})
if(process.env.NODE_ENV!=="production"){
    globalprisma.prisma=Prisma;
}
export default Prisma 