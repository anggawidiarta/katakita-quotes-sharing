"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

interface Creator {
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
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();
  return (
    <div className="prompt_card">
      <div className="flex items-start justify-between gap-5">
        <div className="flex items-center justify-start flex-1 gap-3 cursor-pointer">
          <Image
            src={post.creator.image || "/assets/images/placeholder-image.png"}
            alt="User Image"
            width={40}
            height={40}
          />

          <div className="flex flex-col">
            <h3 className="font-semibold text-gray-900 font-satoshi">
              {post.creator.username || ""}
            </h3>
            <p className="text-sm text-gray-500 font-inter">
              {post.creator.email || ""}
            </p>
          </div>
        </div>

        <div className="copy_btn" onClick={() => {}}>
          <Image
            src={"/assets/icons/copy-text-svgrepo-com.svg"}
            width={12}
            height={12}
            alt="Copy Button"
          />
        </div>
      </div>

      <p className="my-4 text-sm text-gray-700 font-satoshi">{post.text}</p>
      <p className="text-sm cursor-pointer font-inter blue_gradient">
        {post.tag}
      </p>
    </div>
  );
};

export default PostCard;
