"use client";
import React from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

const PromptCard = () => {
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();
  return (
    <div className="prompt_card">
      <div className="flex items-start justify-between gap-5">
        <div className="flex items-center justify-start flex-1 gap-3 cursor-pointer">
          <Image src={""} alt="User Image" width={40} height={40} />
        </div>
      </div>
    </div>
  );
};

export default PromptCard;
