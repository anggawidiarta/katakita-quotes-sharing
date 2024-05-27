"use client";

import React from "react";
import Profile from "@/components/Profile/Profile";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { NextPage } from "next";

// Define the type for the UserProfile component's props
interface UserProfileProps {
  params: {
    id: string;
  };
}

/**
 * UserProfile component fetches and displays posts for a specific user.
 *
 * @param {UserProfileProps} props - The parameters for the user profile, including the user ID.
 * @returns {JSX.Element} The UserProfile component.
 */
const UserProfile: NextPage<UserProfileProps> = ({
  params,
}: UserProfileProps): JSX.Element => {
  const router = useRouter();
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const userName = searchParams.get("name");
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        console.log(params.id);
        const response = await fetch(`/api/users/${params?.id}/posts`, {
          method: "GET",
        });
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        const data = await response.json();
        setUserPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    if (params?.id) {
      fetchPosts();
    }
  }, [params.id]);

  /**
   * Handles editing of a post.
   *
   * @param {Post} post - The post to be edited.
   */
  const handleEdit = (post: any) => {
    router.push(`/update-post?id=${post._id}`);
  };

  const handleDelete = async (post: any) => {};

  return (
    <Profile
      name={userName ?? ""}
      desc={`Welcome to ${userName}'s profile page`}
      data={userPosts}
      loading={loading}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default UserProfile;
