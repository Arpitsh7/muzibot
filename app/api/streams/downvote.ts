import Prisma from "../lib/prisma"
import {NextResponse,NextRequest} from "next/server"
import {z} from "zod"
import {getSession} from "../lib/auth-client"
import {auth} from "../lib/auth"
const UpvoteSchema=z.object({
    streamId:z.string()
})
export async function POST(req:NextResponse){
    const data=UpvoteSchema.parse(await(req.json()))
    const session = await auth.api.getSession()

    if(!session?.user?.id){
        return Response.json({
            message:"no session found"
        },
    {
        status:401
    })
    }
    await Prisma.upvote.delete({
        where:{
            streamId_userId:{
            streamId:data.streamId,
            userId:session.user.id
        }
        }
    })
}