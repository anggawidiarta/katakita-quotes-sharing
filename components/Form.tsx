import React from "react";
import Link from "next/link";

type FormProps = {
  type: string;
  post?: any;
  setPost?: any;
  submitting?: boolean;
  handleSubmit?: any;
};

const Form = ({ type, post, setPost, submitting, handleSubmit }: FormProps) => {
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
        <label htmlFor="">
          <span className="text-base font-semibold text-gray-700 font-satoshi">
            Your Words or Quotes
          </span>
          <textarea
            name=""
            id=""
            value={post.prompt}
            onChange={(e) => setPost({ ...post, prompt: e.target.value })}
            placeholder="Write your prompt here..."
            className="form_textarea"
          ></textarea>
        </label>

        <label htmlFor="">
          <span className="text-base font-semibold text-gray-700 font-satoshi">
            Tag{" "}
            <span className="font-normal text-transparent bg-gradient-to-r from-blue-600 bg-clip-text to-amber-600">
              (#Quotes, #Motivation, #Poetry)
            </span>
          </span>
          <textarea
            name=""
            id=""
            value={post.prompt}
            onChange={(e) => setPost({ ...post, prompt: e.target.value })}
            placeholder="#Tags"
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
            className="px-5 py-1 text-sm text-white rounded-full bg-primary-orange hover:bg-blue-400 transition-all duration-200"
          >
            Submit
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
