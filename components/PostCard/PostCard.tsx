"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { DefaultSession } from "next-auth";
import { capitalCase } from "capital-case";

declare module "next-auth" {
  interface Session {
    user: {
      id?: string; // Add the id property to the user object
    } & DefaultSession["user"]; // Include the default properties of the user object
  }
}

// Define the Creator interface
interface Creator {
  _id: string | undefined;
  image: string;
  username: string;
  email: string;
}

// Define the Post interface
interface Post {
  creator: Creator;
  text: string;
  tag: string;
}

// Define the PostCardProps interface
interface PostCardProps {
  post: Post;
  handleTagClick?: (tag: string) => void;
  handleEdit?: (post: Post) => void;
  handleDelete?: (post: Post) => void;
}

/**
 * PostCard component displays a single post with options to edit, delete, and view the creator's profile.
 *
 * @param {PostCardProps} props - The properties passed to the component.
 * @returns {JSX.Element} The PostCard component.
 */
const PostCard: React.FC<PostCardProps> = ({
  post,
  handleTagClick,
  handleEdit,
  handleDelete,
}) => {
  const [copied, setCopied] = useState<boolean | string>("");
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();

  /**
   * Handles the profile click event to navigate to the profile page.
   */
  const handleProfileClick = () => {
    if (post.creator._id === session?.user?.id) {
      return router.push("/profile");
    }
    return router.push(
      `/profile/${post.creator._id}?name=${post.creator.username}`
    );
  };

  const handleCopy = () => {
    setCopied(post.text);
    navigator.clipboard.writeText(post.text);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="prompt_card">
      <div className="flex items-start justify-between gap-5">
        <div
          className="flex items-center justify-start flex-1 gap-3 cursor-pointer"
          onClick={handleProfileClick}
        >
          <Image
            src={post.creator.image || "/assets/images/placeholder-image.png"}
            alt="User Image"
            className="rounded-full object-contain"
            width={48}
            height={48}
          />

          <div className="flex flex-col w-auto">
            <h3 className=" text-gray-900 text-[16px] merriweather-bold max-w-[10ch] 2xs:max-w-[15ch] xs:max-w-full truncate tracking-wide">
              {capitalCase(post.creator.username) || ""}
            </h3>
            <p className=" text-gray-500 roboto-light text-[12px] max-w-[10ch] 2xs:max-w-[15ch] xs:max-w-full truncate">
              {post.creator.email || ""}
            </p>
          </div>
        </div>

        <div className="copy_btn" onClick={handleCopy}>
          <Image
            src={
              copied === post.text
                ? "/assets/icons/hugeicons--tick-double-03.svg"
                : "/assets/icons/copy-text-svgrepo-com.svg"
            }
            width={12}
            height={12}
            alt={copied === post.text ? "Tick Icon" : "Copy Icon"}
          />
        </div>
      </div>

      <p className="my-4 text-sm text-gray-700 roboto-regular text-[14px]">
        {post.text}
      </p>
      <p
        className="cursor-pointer !roboto-thin text-[12px] blue_gradient"
        onClick={() => handleTagClick && handleTagClick(post.tag)}
      >
        {post.tag}
      </p>

      {session?.user.id === post.creator._id && pathName === "/profile" && (
        <div className="gap-4 mt-5 border-t border-gray-100 flex-center">
          <p
            className="text-sm cursor-pointer roboto-medium green_gradient"
            onClick={() => handleEdit && handleEdit(post)}
          >
            Edit
          </p>
          <p
            className="text-sm cursor-pointer roboto-medium orange_gradient"
            onClick={() => handleDelete && handleDelete(post)}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
};

export default PostCard;
