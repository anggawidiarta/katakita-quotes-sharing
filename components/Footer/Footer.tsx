"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import SocialLinks from "./Social";

const Footer: React.FC = () => {
  return (
    <footer className="relative z-20 bg-[rgba(253,208,28,0.75)]  mt-7">
      <div className="px-6 py-4 mx-auto sm:px-16 max-w-7xl md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <Link
            href="https://flowbite.com/"
            className="flex items-center mb-4 space-x-3 sm:mb-0 rtl:space-x-reverse"
          >
            <span className="self-center text-xl font-semibold text-[#251609] whitespace-nowrap font-montserrat tracking-wide drop-shadow-lg text-clip">
              KataKita
            </span>
          </Link>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium font font-montserrat text-[#251609] sm:mb-0 dark:text-gray-400">
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">
                About
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">
                Licensing
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Contact
              </a>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-[#251609] border-2 rounded-full sm:mx-auto lg:my-6" />
        <SocialLinks />
        <span className="block text-sm font-montserrat text-[#251609] sm:text-center dark:text-gray-400">
          © {new Date().getFullYear()}{" "}
          <a href="/" className="hover:underline hover:font-semibold">
            KataKita™.{" "}
          </a>
          All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
