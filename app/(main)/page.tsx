"use client";
import Image from "next/image";
import Feed from "@/components/Feed/Feed";
import styles from "./page.module.scss";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  return (
    <section className="flex-col w-full flex-center">
      <h1 className="text-center head_text font-playfair">
        Discover & Share
        <br className="max-md:hidden" />
        <span className="text-center orange_gradient font-playfair">
          {" "}
          Prayers, Poem, Quotes for a Better Day
        </span>
      </h1>
      <p className="text-center text-black desc merriweather-light">
        KataKita is an open-source AI prompting tool for modern world to
        discover, create and share creative prompts
      </p>
      {session?.user ? (
        <Feed />
      ) : (
        <div>
          <p className="text-center merriweather-bold text-xl my-52 capitalize">
            Login in to get started
          </p>
        </div>
      )}
    </section>
  );
}
