"use client";

import Feed from "@/components/Feed/Feed";
import { useSession } from "next-auth/react";
import { capitalCase } from "capital-case";
import { NextPage } from "next";
import Pokemon from "./pokemon/page";

const Home: NextPage = () => {
  const { data: session } = useSession();
  return (
    <section className="flex-col w-full flex-center">
      <h1 className="text-center head_text text-[#251609] font-playfair">
        Discover & Share
        <br className="max-md:hidden" />
        <span className="text-center yellow_gradient font-playfair">
          {" "}
          Prayers, Poem, Quotes for a Better Day
        </span>
      </h1>
      <p className="text-center text-[#251609] desc font-montserrat font-medium">
        {capitalCase(
          "InspireDaily: Your go-to hub for daily wisdom, uplifting quotes, and heartfelt prayers. Share and discover words that inspire and transform lives."
        )}
      </p>
      {session?.user ? (
        <Feed />
      ) : (
        <div>
          <p className="my-48 text-xl text-[#251609] font-semibold text-center capitalize font-montserrat drop-shadow-md">
            Login to get started
          </p>
        </div>
      )}
    </section>
  );
};

export default Home;
