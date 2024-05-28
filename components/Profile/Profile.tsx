import React from "react";
import PostCard from "../PostCard/PostCard";

interface Creator {
  username: string;
  email: string;
  image: string;
}

interface Post {
  _id: string;
  creator: Creator;
  text: string;
  tag: string;
}

interface ProfileProps {
  name: string;
  desc: string;
  data: Post[];
  loading: boolean;
  handleEdit: (post: Post) => void;
  handleDelete: (post: Post) => void;
}

const Profile: React.FC<ProfileProps> = ({
  name,
  desc,
  data,
  loading,
  handleEdit,
  handleDelete,
}) => {
  return (
    <section className="w-full">
      <h1 className="text-left head_text !merriweather-bold">
        <span className="blue_gradient">{name} </span>
        Profile
      </h1>
      <p className="text-2xl tracking-wide text-left capitalize roboto-medium">{desc}</p>
      <div className="mt-10 prompt_layout min-h-[60vh]">
        {loading ? (
          <div>Loading...</div>
        ) : data.length > 0 ? (
          data.map((post: any) => (
            <PostCard
              key={post._id}
              post={post}
              handleEdit={() => handleEdit && handleEdit(post)}
              handleDelete={() => handleDelete && handleDelete(post)}
            />
          ))
        ) : (
          <div className="text-2xl font-bold text-black">No posts</div>
        )}
      </div>
    </section>
  );
};

export default Profile;
