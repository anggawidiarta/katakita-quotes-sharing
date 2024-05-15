"use client";
import Form from "@/components/Form";
import React, { useState } from "react";

const CreatePage = () => {
  const [post, setPost] = useState({ prompt: "", tag: "" });
  return <Form type="Create" post={post} setPost={setPost} />;
};

export default CreatePage;
