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
      <a href="/" className="flex gap-2 flex-center">
        <Image
          src={"/assets/images/comment.png"}
          alt="Logo Banner"
          width={50}
          height={50}
          className="object-contain"
        />
        <p className="logo_text">KataKita</p>
      </a>

      {/* Desktop Navigation */}
      <div className="hidden sm:flex">
        {session?.user ? (
          <div className="flex items-center gap-3 md:gap-5">
            <Link
              href={"/create-post"}
              className="black_btn !bg-[#fdd01c] !text-black hover:!bg-black hover:!text-white transition duration-300"
            >
              Create Post
            </Link>
            <button
              type="button"
              className="transition duration-300 outline_btn"
              onClick={() => signOut()}
            >
              Sign Out
            </button>

            <Link href={"/profile"}>
              <Image
                src={session?.user.image || "/assets/images/profile.svg"}
                width={48}
                height={48}
                className="rounded-full ring-offset-4 ring-offset-[#f5fdfc] ring-2 ring-[#fdd01c] hover:ring-[#251609] transition duration-300"
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
                    className="black_btn !bg-[#fdd01c] !text-black hover:!bg-black hover:!text-white transition duration-300"
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
              width={48}
              height={48}
              className="rounded-full ring-offset-4 ring-offset-[#f5fdfc] ring-2 ring-[#fdd01c] hover:ring-[#251609] transition duration-300"
              alt="profile"
              onClick={() => {
                setToggleDropdown((prev) => !prev);
              }}
            />
            {toggleDropdown && (
              <div className="dropdown !bg-[#251609]">
                <Link
                  href={"/profile"}
                  className="dropdown_link !text-[#f5fdfc]"
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href={"/profile"}
                  className="dropdown_link !text-[#f5fdfc]"
                  onClick={() => setToggleDropdown(false)}
                >
                  Create Post
                </Link>
                <button
                  type="button"
                  className="w-full black_btn !bg-[#f5fdfc] !text-black hover:!bg-yellow-400 transition-all duration-300 !border-none"
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
                  className="black_btn !bg-[#fdd01c] !text-black hover:!bg-black hover:!text-white transition duration-300"
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
