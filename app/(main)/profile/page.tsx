"use client";

import React, { useState, useEffect } from "react";
import Profile from "@/components/Profile/Profile";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { NextPage } from "next";

// Define the type for the Post
interface Post {
  _id: string;
  creator: {
    _id: string;
    email: string;
    username: string;
    image: string;
  };
  text: string;
  tag: string;
}

/**
 * ProfilePage component displays the user's profile with their posts.
 *
 * @returns {JSX.Element} The ProfilePage component.
 */
const ProfilePage: NextPage = (): JSX.Element => {
  const router = useRouter();
  const { data: session } = useSession();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    /**
     * Fetches the posts for the logged-in user.
     */
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/users/${session?.user.id}/posts`, {
          method: "GET",
        });
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        const data: Post[] = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    if (session?.user.id) {
      fetchPosts();
    }
  }, [session?.user.id]);

  /**
   * Handles editing a post.
   *
   * @param {Post} post - The post to be edited.
   */
  const handleEdit = async (post: any) => {
    router.push(`/update-post?id=${post._id}`);
  };

  /**
   * Handles deleting a post.
   *
   * @param {Post} post - The post to be deleted.
   */
  const handleDelete = async (post: any) => {
    try {
      const response = await fetch(`/api/post/${post._id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete post");
      }
      const filteredPosts = posts.filter((p) => p._id !== post._id);
      setPosts(filteredPosts);
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <Profile
      name={"My"}
      desc={"Welcome to your personalized profile page"}
      data={posts}
      loading={loading}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default ProfilePage;
