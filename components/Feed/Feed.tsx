"use client";

import { ChangeEvent, useEffect, useState } from "react";
import styles from "./Feed.module.scss";
import PostCard from "../PostCard/PostCard";

interface Post {
  _id: string;
  creator: {
    username: string;
  };
  tag: string;
  text: string;
}

interface PostCardListProps {
  data: Post[];
  handleTagClick: (tag: string) => void;
}

const PostCardList: React.FC<PostCardListProps> = ({
  data,
  handleTagClick,
}) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.length < 1 ? (
        <div className="text-2xl font-bold">Post Not Found</div>
      ) : (
        data.map((post: any) => (
          <PostCard
            key={post._id}
            post={post}
            handleTagClick={handleTagClick}
          />
        ))
      )}
    </div>
  );
};

const Feed: React.FC = () => {
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(
    null
  );
  const [searchedResults, setSearchedResults] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchPosts = async () => {
    setLoading(true);
    const response = await fetch("/api/post");
    const data: Post[] = await response.json();
    setAllPosts(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const filterPost = (searchText: string): Post[] => {
    const regex = new RegExp(searchText, "i"); // 'i' flag for case-insensitive search
    return allPosts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.text)
    );
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (searchTimeout) clearTimeout(searchTimeout);
    setSearchText(e.target.value);
    setLoading(true);

    // debounce method
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPost(e.target.value);
        setSearchedResults(searchResult);
        setLoading(false);
      }, 1000)
    );
  };

  const handleTagClick = (tagName: string) => {
    setSearchText(tagName);
    setLoading(true);

    const searchResult = filterPost(tagName);
    setSearchedResults(searchResult);
    setLoading(false);
  };

  return (
    <section className="feed">
      <form action="" className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          className="search_input peer"
        />
      </form>

      {/* All Posts */}
      {loading ? (
        <div className="my-40">
          <div className={styles.feed__loader}></div>
        </div>
      ) : (
        <PostCardList
          data={searchText ? searchedResults : allPosts}
          handleTagClick={handleTagClick}
        />
      )}
    </section>
  );
};

export default Feed;
