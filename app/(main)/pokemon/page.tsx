"use client";
import { NextPage } from "next";
import React, { useEffect, useState } from "react";

const Pokemon: NextPage = () => {
  const [allpost, setAllPost] = useState<any>([]);
  useEffect(() => {
    const fetchPost = async () => {
      try {
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
        // console.log('dog');
        setAllPost(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPost();
  }, []);

  return (
    <div>
      page
      <ul>
        {allpost?.results?.map((post: any, index: number) => (
          <li key={index}>
            {index + 1}. {post.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pokemon;
