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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width="64"
          zoomAndPan="magnify"
          viewBox="0 0 375 374.999991"
          height="64"
          preserveAspectRatio="xMidYMid meet"
          version="1.0"
        >
          <defs>
            <clipPath id="8181b98e37">
              <path
                d="M 45.9375 37.5 L 329.4375 37.5 L 329.4375 337.5 L 45.9375 337.5 Z M 45.9375 37.5 "
                clipRule="nonzero"
              />
            </clipPath>
          </defs>
          <g clipPath="url(#8181b98e37)">
            <path
              fill="#fdd01c"
              stroke="black"
              strokeWidth={8}
              strokeLinejoin="round"
              paintOrder={"stroke fill markers"}
              d="M 329.0625 37.550781 C 329.0625 53.253906 316.214844 65.980469 300.632812 65.980469 L 74.367188 65.980469 C 58.785156 65.980469 45.9375 53.253906 45.9375 37.550781 Z M 292.304688 150.207031 L 292.304688 257.746094 C 292.660156 274.519531 282.429688 289.628906 263.992188 303.425781 L 263.992188 259.054688 C 263.992188 258.816406 263.992188 258.578125 263.992188 258.339844 L 263.992188 211.945312 L 224.851562 211.945312 L 224.851562 325.792969 C 216.167969 329.835938 206.773438 333.640625 196.660156 337.449219 L 196.660156 215.160156 L 214.027344 197.789062 L 196.660156 180.421875 L 196.660156 88.703125 L 224.851562 88.703125 L 224.851562 183.632812 L 263.992188 183.632812 L 263.992188 88.703125 L 292.304688 88.703125 Z M 178.339844 150.207031 L 178.339844 180.777344 L 161.328125 197.789062 L 178.339844 214.800781 L 178.339844 337.449219 C 168.226562 333.640625 158.832031 329.835938 150.148438 325.792969 L 150.148438 211.945312 L 111.007812 211.945312 L 111.007812 258.339844 C 111.007812 258.578125 111.007812 258.816406 111.007812 259.054688 L 111.007812 303.425781 C 92.570312 289.628906 82.339844 274.519531 82.695312 257.746094 L 82.695312 88.703125 L 111.007812 88.703125 L 111.007812 183.632812 L 150.148438 183.632812 L 150.148438 88.703125 L 178.339844 88.703125 Z M 178.339844 150.207031 "
              fillOpacity="1"
              fillRule="evenodd"
            />
          </g>
        </svg>
        <p className="logo_text font-playfair tracking-wide">KataKita</p>
      </Link>

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
              <div className="dropdown !bg-[rgba(37,22,9,0.75)]">
                <Link
                  href={"/profile"}
                  className="dropdown_link !text-[#f5fdfc]"
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href={"/create-post"}
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
