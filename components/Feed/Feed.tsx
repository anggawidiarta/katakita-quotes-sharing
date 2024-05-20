"use client";

import { useEffect, useState } from "react";
import styles from "./Feed.module.scss";

import PostCard from "../PostCard/PostCard";

const PostCardList = ({ data, handleTagClick }: any) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </div>
  );
};

const Feed = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);

  const fetchPosts = async () => {
    const response = await fetch("/api/post");
    const data = await response.json();
    setAllPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // const handleTagClick = (tagName) => {
  //   setSearchText(tagName);
  //   const searchResult = filterPrompts(tagName);
  //   setSearchedResults(searchResult);
  // };

  return (
    <section className="feed">
      <form action="" className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="search_input peer"
        />
      </form>

      {/* {searchText?} */}
      <PostCardList data={allPosts} />
    </section>
  );
};

export default Feed;
