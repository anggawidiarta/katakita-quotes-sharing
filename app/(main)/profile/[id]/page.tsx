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
  const searchParams = useSearchParams();
  const userName = searchParams.get("name");
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
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

  return (
    <>
      <title>{`${userName ?? "Empty"} Profile | KataKita`}</title>
      <Profile
        name={userName ?? ""}
        desc={`Welcome to the vibrant and inspiring profile page of ${userName}, where you can discover their favorite quotes, wisdom, and heartfelt contributions.`}
        data={userPosts}
        loading={loading}
      />
    </>
  );
};

export default UserProfile;
