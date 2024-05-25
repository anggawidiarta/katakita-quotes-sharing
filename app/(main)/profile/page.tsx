"use client";

import React from "react";
import Profile from "@/components/Profile/Profile";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { data } from "autoprefixer";
import { NextPage } from "next";

const ProfilePage: NextPage = () => {
  const { data: session } = useSession();
  const [posts, setPosts] = useState<never[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const response = await fetch(`/api/users/${session?.user.id}/posts`, {
        method: "GET",
      });
      const data = await response.json();

      setPosts(data);
      setLoading(false);
    };

    if (session?.user.id) {
      fetchPosts();
    }
  }, [session?.user.id]);

  const handleEdit = async () => {};

  const handleDelete = async () => {};

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
