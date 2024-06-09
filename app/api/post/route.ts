import { connectToDB } from "@/utils/database";
import Post from "@/models/post";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

/**
 * GET handler to fetch all posts.
 *
 * This function connects to the database, retrieves all posts,
 * populates the "creator" field, and returns the posts in JSON format.
 * If an error occurs during the process, it logs the error and returns
 * a 500 status response.
 *
 * @param {NextRequest} _request - The request object, not used in this handler.
 *
 * @returns {Promise<NextResponse>} The response object containing the posts or an error message.
 */
export const GET = async (_request: NextRequest): Promise<NextResponse> => {
  try {
    // Connect to the database
    await connectToDB();

    // Retrieve all posts and populate the "creator" field
    const posts = await Post.find({}).populate("creator");

    // Return the posts in JSON format with a 200 status code
    return new NextResponse(JSON.stringify(posts), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    // Log the error and return a 500 status response
    console.error("Error fetching posts:", error);
    return new NextResponse("Failed to fetch all posts", { status: 500 });
  }
};
