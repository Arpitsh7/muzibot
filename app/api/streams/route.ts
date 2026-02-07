import Prisma from "../lib/prisma"
import { NextResponse, NextRequest } from "next/server"
import { z } from "zod"
import yoututbesearchapi from "youtube-search-api"

var YT_REGEX =
  /^((?:https?:)?\/\/)?((?:www\.)?(?:m\.)?(?:youtu(?:be)?\.com\/(?:v\/|embed\/|watch\?v=)|youtu\.be\/)([\w\-]+)(?:\S+)?)$/;

const StreamSchema = z.object({
  creatorId: z.string(),
  url: z.string()
})

export async function POST(req: NextRequest) {
  try {
    // 1. Parse request body safely
    const body = await req.json()

    // 2. Validate with Zod
    const data = StreamSchema.parse(body)

    // 3. Validate URL
    const isYT = YT_REGEX.test(data.url)
    if (!isYT) {
      return NextResponse.json(
        { message: "Wrong URL format" },
        { status: 400 }
      )
    }

    // 4. Extract video ID safely
    const extractedId = data.url.split("?v=")[1]
    if (!extractedId) {
      return NextResponse.json(
        { message: "Could not extract video ID" },
        { status: 400 }
      )
    }

    // 5. Call YouTube API safely
    let res
    try {
      res = await yoututbesearchapi.GetVideoDetails(extractedId)
    } catch (err) {
      console.error("YouTube API error:", err)
      return NextResponse.json(
        { message: "Failed to fetch video details" },
        { status: 500 }
      )
    }

    // 6. Handle thumbnails safely
    const thumbnails = res.thumbnail?.thumbnails || []

    thumbnails.sort((a: { width: number }, b: { width: number }) =>
      a.width < b.width ? -1 : 1
    )

    const smallImg =
      thumbnails.length > 1
        ? thumbnails[thumbnails.length - 2].url
        : thumbnails[thumbnails.length - 1]?.url ||
          "https://via.placeholder.com/150"

    const bigImg =
      thumbnails[thumbnails.length - 1]?.url ||
      "https://via.placeholder.com/300"

    // 7. Save to database safely
    try {
      await Prisma.stream.create({
        data: {
          url: data.url,
          userId: data.creatorId,
          extractedId,
          type: "youtube",
          title: res.title ?? "Can't find video",
          smallImg,
          bigImg
        }
      })
    } catch (err) {
      console.error("Prisma error:", err)
      return NextResponse.json(
        { message: "Database error" },
        { status: 500 }
      )
    }

    // 8. Success response
    return NextResponse.json(
      { message: "Stream added successfully" },
      { status: 201 }
    )

  } catch (err: any) {
    console.error("General error:", err)

    // Zod validation error
    if (err.name === "ZodError") {
      return NextResponse.json(
        { message: "Invalid input", error: err.errors },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    )
  }
}
