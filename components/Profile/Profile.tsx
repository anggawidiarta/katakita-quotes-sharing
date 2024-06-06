import React from "react";
import PostCard from "../PostCard/PostCard";
import { capitalCase } from "capital-case";
import { useSession } from "next-auth/react";

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
  const { data: session } = useSession();
  return (
    <section className="w-full">
      <h1 className="text-left head_text !merriweather-bold">
        <span className="yellow_gradient">{capitalCase(name)} </span>
        Profile
      </h1>
      <p className="text-xl tracking-tighter text-[#251609] text-left font-medium capitalize font-montserrat w-full sm:w-3/4">
        {capitalCase(desc)}
      </p>
      <div className="mt-10 prompt_layout min-h-[60vh]">
        {session?.user.id ? (
          loading ? (
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
          )
        ) : (
          <div className="text-lg font-medium text-black w-full">
            Please Sign In To See The Profile
          </div>
        )}
      </div>
    </section>
  );
};

export default Profile;
