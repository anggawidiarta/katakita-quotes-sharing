"use client";

import { useEffect, useState } from "react";
import styles from "./Feed.module.scss";
import PromptCard from "../PromptCard/PromptCard";

const Feed = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);

  const fetchPosts = async () => {
    const response = await fetch("/api/prompt");
    const data = await response.json();
    setAllPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

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

      <div className="mt-16 prompt_layout">
        <PromptCard />
      </div>
    </section>
  );
};

export default Feed;
