import { connectToDB } from "@/utils/database";
import Post from "@/models/post";
import { NextRequest, NextResponse } from "next/server";

/**
 * GET handler to fetch posts by a specific user.
 *
 * This function connects to the database, retrieves posts created by a user
 * identified by the `id` parameter, and returns the posts in JSON format.
 * If an error occurs during the process, it logs the error and returns a
 * 500 status response.
 *
 * @param {NextRequest} _request - The request object, not used in this handler.
 * @param {Object} context - The context object containing route parameters.
 * @param {Object} context.params - The route parameters.
 * @param {string} context.params.id - The ID of the user whose posts are to be fetched.
 *
 * @returns {Promise<NextResponse>} The response object containing the posts or an error message.
 */
export const GET = async (
  _request: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse> => {
  try {
    // Connect to the database
    await connectToDB();

    // Extract user ID from route parameters
    const userId = params.id;

    // Retrieve posts created by the specified user
    const posts = await Post.find({ creator: userId }).populate("creator");

    // Return the posts in JSON format with a 200 status code
    return new NextResponse(JSON.stringify(posts), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    // Log the error and return a 500 status response
    console.error("Error fetching posts:", error);
    return new NextResponse("Failed to fetch all posts", { status: 500 });
  }
};

export const PATCH = async (request: NextRequest): Promise<NextResponse> => {};

export const DELETE = async (request: NextRequest): Promise<NextResponse> => {};
