import React from "react";
import PostCard from "../PostCard/PostCard";

interface ProfileProps {
  name: string;
  desc: string;
  data: never[];
  handleEdit: () => void;
  handleDelete: () => void;
}

const Profile: React.FC<ProfileProps> = ({
  name,
  desc,
  data,
  handleEdit,
  handleDelete,
}) => {
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{name} </span>
        Profile
      </h1>
      <p className="text-left">{desc}</p>
      <div className="mt-16 prompt_layout min-h-[60vh]">
        {data.map((post: any) => (
          <PostCard key={post._id} post={post} handleTagClick={handleEdit} />
        ))}
      </div>
    </section>
  );
};

export default Profile;
