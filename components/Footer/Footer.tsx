"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React from "react";

const Footer: React.FC = () => {
  // test usePathname as to make a conditional footer
  const isProfile = usePathname() === "/profile";
  return (
    <footer className="relative z-20 bg-[#343F56] dark:bg-black mt-7">
      <div className="px-6 py-4 mx-auto sm:px-16 max-w-7xl md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <a
            href="https://flowbite.com/"
            className="flex items-center mb-4 space-x-3 sm:mb-0 rtl:space-x-reverse"
          >
            <Image
              src="https://flowbite.com/docs/images/logo.svg"
              width={32}
              height={32}
              alt="Logo"
            />
            <span className="self-center font-montserrat text-2xl font-semibold text-[#251609] whitespace-nowrap">
              KataKita
            </span>
          </a>
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
        <hr className="my-6 border-[#251609] border-2 rounded-full sm:mx-auto lg:my-8" />
        <span className="block text-sm font-montserrat text-[#251609] sm:text-center dark:text-gray-400">
          © {new Date().getFullYear()}
          {/* TODO: change href*/}
          <a href="https://flowbite.com/" className="hover:underline">
            KataKita™
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
