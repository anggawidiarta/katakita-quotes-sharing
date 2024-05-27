import { connectToDB } from "@/utils/database";
import Post from "@/models/post";

export const POST = async (request: Request): Promise<Response> => {
  try {
    const { userId, text, tag } = await request.json();

    // Connect to the database
    await connectToDB();

    // Create a new post with the given information
    const newPost = new Post({
      creator: userId,
      text,
      tag,
    });

    // Save the new prompt to the database
    await newPost.save();

    // Return a successful response with the newly created prompt
    return new Response(JSON.stringify(newPost), {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error creating new prompt:", error);

    // Return a failed response if there was an error
    return new Response("Failed to create a new prompt", {
      status: 500,
    });
  }
};
