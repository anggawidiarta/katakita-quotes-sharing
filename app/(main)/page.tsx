"use client";
import Image from "next/image";
import Feed from "@/components/Feed/Feed";
import styles from "./page.module.scss";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  return (
    <section className="flex-col w-full flex-center">
      <h1 className="text-center head_text">
        Discover & Share
        <br className="max-md:hidden" />
        <span className="text-center orange_gradient"> AI-Powered Prompts</span>
      </h1>
      <p className="text-center text-black desc">
        KataKita is an open-source AI prompting tool for modern world to
        discover, create and share creative prompts
      </p>
      {session?.user ? (
        <Feed />
      ) : (
        <div>
          <p className="text-center font-satoshi text-xl font-bold my-52">
            Login in to get started
          </p>
        </div>
      )}
    </section>
  );
}
