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

    // Retrieve posts created by the specified user
    const posts = await Post.findById(params.id).populate("creator");

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

/**
 * PATCH handler to update a post.
 *
 * This function updates a post identified by the `id` parameter with the
 * provided `text` and `tag` from the request body. If the post does not
 * exist, it returns a 404 status response. On error, it returns a 500
 * status response.
 *
 * @param {NextRequest} request - The request object containing the body with `text` and `tag`.
 * @param {Object} context - The context object containing route parameters.
 * @param {Object} context.params - The route parameters.
 * @param {string} context.params.id - The ID of the post to be updated.
 *
 * @returns {Promise<NextResponse>} The response object containing the updated post or an error message.
 */
export const PATCH = async (
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse> => {
  try {
    const { text, tag }: { text: string; tag: string } = await request.json();

    await connectToDB();

    const existingPost = await Post.findById(params.id);

    if (!existingPost) {
      return new NextResponse("Post not found", { status: 404 });
    }

    existingPost.text = text;
    existingPost.tag = tag;

    await existingPost.save();

    return new NextResponse(JSON.stringify(existingPost), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error updating post:", error);
    return new NextResponse("Failed to update post", { status: 500 });
  }
};

/**
 * DELETE handler to remove a post.
 *
 * This function deletes a post identified by the `id` parameter. If an error
 * occurs during the process, it logs the error and returns a 500 status response.
 *
 * @param {NextRequest} _request - The request object, not used in this handler.
 * @param {Object} context - The context object containing route parameters.
 * @param {Object} context.params - The route parameters.
 * @param {string} context.params.id - The ID of the post to be deleted.
 *
 * @returns {Promise<NextResponse>} The response object indicating success or failure.
 */
export const DELETE = async (
  _request: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse> => {
  try {
    await connectToDB();

    await Post.findByIdAndDelete(params.id);

    return new NextResponse("Post deleted successfully", { status: 200 });
  } catch (error) {
    console.error("Error deleting post:", error);
    return new NextResponse("Failed to delete post", { status: 500 });
  }
};
