"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import {
  useSession,
  signIn,
  signOut,
  getProviders,
  ClientSafeProvider,
} from "next-auth/react";

const Nav: React.FC = () => {
  const { data: session } = useSession();

  const [providers, setProviders] = useState<Record<
    string,
    ClientSafeProvider
  > | null>(null);
  const [toggleDropdown, setToggleDropdown] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);

  return (
    <nav className="w-full mb-16 flex-between">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src={"/assets/images/comment.png"}
          alt="Logo Banner"
          width={50}
          height={50}
          className="object-contain"
        />
        <p className="logo_text">KataKita</p>
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden sm:flex">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href={"/create-post"} className="black_btn">
              Create Post
            </Link>
            <button
              type="button"
              className="outline_btn "
              onClick={() => signOut()}
            >
              Sign Out
            </button>

            <Link href={"/profile"}>
              <Image
                src={session?.user.image || "/assets/images/profile.svg"}
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
                <>
                  <button
                    type="button"
                    key={provider.name}
                    onClick={() => signIn(provider.id)}
                    className="black_btn"
                  >
                    Sign In
                  </button>
                </>
              ))}
          </React.Fragment>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className="relative flex sm:hidden">
        {session?.user ? (
          <div className="flex">
            <Image
              src={session?.user.image || "/assets/images/profile.svg"}
              width={37}
              height={37}
              className="rounded-full"
              alt="profile"
              onClick={() => {
                setToggleDropdown((prev) => !prev);
              }}
            />
            {toggleDropdown && (
              <div className="dropdown">
                <Link
                  href={"/profile"}
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href={"/profile"}
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  Create Prompt
                </Link>
                <button
                  type="button"
                  className="w-full black_btn"
                  onClick={() => signOut()}
                >
                  Sign Out
                </button>
              </div>
            )}
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
