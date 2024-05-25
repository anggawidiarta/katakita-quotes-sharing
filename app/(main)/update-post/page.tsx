"use client";

import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const EditPost: NextPage = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const postId = searchParams.get("id");
  const [post, setPost] = useState({ text: "", tag: "" });
  const [loading, setLoading] = useState<boolean>(true);
  const [submitting, setSubmitting] = useState<boolean>(false);

  useEffect(() => {
    const getPromptDetails = async () => {
      const response = await fetch(`/api/post/${postId}`);
      const data = await response.json();

      setPost({
        text: data.text,
        tag: data.tag,
      });
    };

    if (postId) getPromptDetails();
  }, [postId]);

  return (
    <div>
      testtttasdasda dasdasd
      {post.text}
      {post.tag}
    </div>
  );
};

export default EditPost;
