"use client";

import React from "react";
import Profile from "@/components/Profile/Profile";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const ProfilePage = () => {
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPosts = async () => {
    // setLoading(true);
    const response = await fetch(`/api/users/${session?.user.id}/posts`);
    const data = await response.json();
    setPosts(data);
    // setLoading(false);
  };

  useEffect(() => {
    if (session?.user.id) {
      fetchPosts();
    }
  }, []);

  const handleEdit = async () => {};

  const handleDelete = async () => {};

  return (
    <Profile
      name={"My"}
      desc={"Welcome to your personalized profile page"}
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default ProfilePage;
