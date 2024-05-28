"use client";

import Form from "@/components/Form/Form";
import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { FormEvent, useEffect, useState } from "react";

const EditPost: NextPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const postId = searchParams.get("id");
  const [post, setPost] = useState({ text: "", tag: "" });

  const [submitting, setSubmitting] = useState<boolean>(false);

  useEffect(() => {
    const getPostDetails = async () => {
      const response = await fetch(`/api/post/${postId}`, {
        method: "GET",
      });
      const data = await response.json();
      setPost({
        text: data.text,
        tag: data.tag,
      });
    };

    if (postId) getPostDetails();
  }, [postId]);

  const updatePost = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch(`/api/post/${postId}`, {
        method: "PATCH",
        body: JSON.stringify({
          text: post.text,
          tag: post.tag,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        router.push("/profile");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form
      post={post}
      setPost={setPost}
      type="Edit"
      submitting={submitting}
      handleSubmit={updatePost}
    />
  );
};

export default EditPost;
