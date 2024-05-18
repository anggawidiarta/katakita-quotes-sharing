"use client";
import Form from "@/components/Form/Form";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const CreatePage = () => {
  const router = useRouter();
  const { data: session } = useSession();

  /**
   * Tracks whether the form is currently submitting or not
   * @return { submitting: boolean, isSubmitting: boolean }
   */
  const [submitting, setSubmitting] = useState(false);

  /**
   * Tracks the current post state
   * @return {{ prompt: string, tag: string }}
   */
  const [post, setPost] = useState({ prompt: "", tag: "" });

  const createPost = async (e: any) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch("/api/prompt/new", {
        method: "POST",
        body: JSON.stringify({
          post: post.prompt,
          userId: session?.user.id,
          tag: post.tag,
        }),
      });
      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form type="Create" post={post} setPost={setPost} submitting={submitting} />
  );
};

export default CreatePage;
