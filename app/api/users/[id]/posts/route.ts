import { connectToDB } from "@/utils/database";
import Post from "@/models/post";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  _request: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse> => {
  try {
    await connectToDB();

    const userId = params.id;
    const posts = await Post.find({ creator: userId }).populate("creator");

    return new NextResponse(JSON.stringify(posts), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return new NextResponse("Failed to fetch all posts", { status: 500 });
  }
};
