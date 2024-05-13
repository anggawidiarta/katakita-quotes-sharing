"use client";
import React, { use } from "react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useSession, signIn, signOut, getProviders } from "next-auth/react";

const Nav: React.FC = () => {
  const isUserLoggedIn = false;

  const [providers, setProviders] = useState(null);

  useEffect(() => {
    (async () => {
      const res: any = await getProviders();
      setProviders(res);
    })();
  }, []);

  return (
    <nav className="w-full px-2 pt-3 mb-16 flex-between">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src={"/assets/images/dog.svg"}
          alt="Logo Banner"
          width={100}
          height={75}
          className="object-contain"
        />
        <p className="logo_text">KataKita</p>
      </Link>

      {/* Mobile Navigation */}
      <div className="hidden sm:flex">
        {isUserLoggedIn ? (
          <div className="flex gap-3 md:gap-5">
            <Link href={"/create-prompt"} className="black_btn">
              Create Post
            </Link>
            <button
              type="button"
              className="outline_btn"
              onClick={() => signOut()}
            >
              Sign Out
            </button>
            <Link href={"/profile"}>
              <Image
                src={"/assets/images/profile.svg"}
                width={37}
                height={37}
                className="rounded-full"
                alt="profile"
              />
            </Link>
          </div>
        ) : (
          <React.Fragment>
            {providers &&
              Object.values(providers).map((provider: any) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Sign In
                </button>
              ))}
          </React.Fragment>
        )}
      </div>
    </nav>
  );
};

export default Nav;
