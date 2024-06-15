"use client";
import React, { useEffect, useState } from "react";

const Pokemon = () => {
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
            },
          }
        );
        const data = await response.json();
        setAllPost(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPost();
  }, []);
  console.log(allpost);

  return (
    <div>
      page
      <ul>
        {allpost.results.map((post:any,index:number) => (
          <li key={post.name}>{index+1}. {post.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Pokemon;
