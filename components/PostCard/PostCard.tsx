"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id?: string; // Add the id property to the user object
    } & DefaultSession["user"]; // Include the default properties of the user object
  }
}

interface Creator {
  _id: string | undefined;
  image?: string;
  username: string;
  email: string;
}

interface Post {
  creator: Creator;
  text: string;
  tag: string;
}

interface PostCardProps {
  post: Post;
  handleTagClick?: (tag: string) => void;
  handleEdit?: () => void;
  handleDelete?: () => void;
}

const PostCard: React.FC<PostCardProps> = ({
  post,
  handleTagClick = () => {},
  handleEdit = () => {},
  handleDelete = () => {},
}) => {
  const [copied, setCopied] = useState<boolean | string>("");
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();

  const handleProfileClick = () => {
    if (post.creator._id === session?.user?.id) {
      return router.push("/profile");
    }
    router.push(`/profile/${post.creator._id}?name=${post.creator.username}`);
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
          onClick={() => {}}
        >
          <Image
            src={post.creator.image || "/assets/images/placeholder-image.png"}
            alt="User Image"
            width={40}
            height={40}
          />

          <div className="flex flex-col w-auto">
            <h3 className="font-semibold text-gray-900 font-satoshi max-w-[10ch] 2xs:max-w-[15ch] xs:max-w-full truncate">
              {post.creator.username || ""}
            </h3>
            <p className="text-sm text-gray-500 font-inter max-w-[10ch] 2xs:max-w-[15ch] xs:max-w-full truncate">
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

      <p className="my-4 text-sm text-gray-700 font-satoshi">{post.text}</p>
      <p
        className="text-sm cursor-pointer font-inter blue_gradient"
        onClick={() => handleTagClick && handleTagClick(post.tag)}
      >
        {post.tag}
      </p>
    </div>
  );
};

export default PostCard;
