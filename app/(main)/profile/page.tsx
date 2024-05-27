"use client";

import React from "react";
import Profile from "@/components/Profile/Profile";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { data } from "autoprefixer";
import { NextPage } from "next";

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

const ProfilePage: NextPage = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
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

  const handleEdit = async (post: any) => {
    router.push(`/update-post?id=${post._id}`);
  };

  const handleDelete = async (post) => {};

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
