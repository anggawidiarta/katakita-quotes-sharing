"use client";
import { NextPage } from "next";
import React, { useEffect, useState } from "react";

// this is just for testing
const Pokemon: NextPage = () => {
  const [allpost, setAllPost] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=122&offset=0",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "cache-control": "force-dynamic",
            },
          }
        );
        const data = await response.json();
        setAllPost(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, []);

  return (
    <div>
      page
      {loading ? (
        <div>Loading...</div>
      ) : (
        <ul>
          {allpost.results.map((post: any, index: number) => (
            <li key={index}>
              {index + 1}. {post.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Pokemon;
