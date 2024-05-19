import React, { ChangeEvent, FormEvent } from "react";
import Link from "next/link";

type Post = {
  text: string;
  tag: string;
};

type FormProps = {
  type: string;
  post: Post;
  setPost: (post: Post) => void;
  submitting: boolean;
  handleSubmit: (e: FormEvent) => void;
};

const Form: React.FC<FormProps> = ({
  type,
  post,
  setPost,
  submitting,
  handleSubmit,
}) => {
  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setPost({ ...post, text: e.target.value });
  };

  const handleTagChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setPost({ ...post, tag: e.target.value });
  };

  return (
    <section className="flex-col w-full max-w-full flex-start">
      <h1 className="text-left head_text">
        <span className="blue_gradient">{type} Post</span>
      </h1>
      <p className="max-w-md text-left desc">{`${type} and share amazing prompts with the world, and let your imagination run wild with any AI-powered platform`}</p>

      <form
        className="flex flex-col w-full max-w-2xl mt-10 glassmorphism gap-7"
        onSubmit={handleSubmit}
        id="form"
      >
        <label>
          <span className="text-base font-semibold text-gray-700 font-satoshi">
            Your Words or Quotes
          </span>
          <textarea
            value={post.text}
            onChange={handleTextChange}
            required
            placeholder="Write your prompt here..."
            className="form_textarea"
          ></textarea>
        </label>

        <label>
          <span className="text-base font-semibold text-gray-700 font-satoshi">
            Tag{" "}
            <span className="font-normal text-transparent bg-gradient-to-r from-blue-600 bg-clip-text to-amber-600">
              (#Quotes, #Motivation, #Poetry)
            </span>
          </span>
          <textarea
            value={post.tag}
            onChange={handleTagChange}
            required
            placeholder="# Choose Your Tags"
            className="form_input"
          ></textarea>
        </label>

        <div className="gap-4 mx-3 mb-5 flex-end">
          <Link href={"/"} className="text-sm text-gray-500">
            Cancel
          </Link>
          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-1 text-sm text-white rounded-full bg-primary-orange hover:bg-blue-400 transition-all duration-[300]"
          >
            {submitting ? `${type}...` : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
