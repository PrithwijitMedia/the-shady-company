
"use client";

import { useEffect, useState } from "react";
import { getSiteSettings } from "@/lib/settings";
import Link from 'next/link';
import {
  driveToImageUrl
} from "@/lib/images";

export default function FloatingLogo({
  logoUrl
}: {
  logoUrl?: string;
}) {
  if (!logoUrl) return null;

  return (
    <div
      className=" absolute top-0 left-0  md:left-6 w-[70px] sm:w-[85px] z-40   origin-top-left
      "
    >
        <Link href="/" className="cursor-pointer">
          <img
         src={driveToImageUrl(
                    logoUrl)}
        alt="The Shady Company"
     className=" w-[110px] sm:w-[130px] md:w-[170px] lg:w-[220px]  h-auto  object-contain "
   />
        </Link>
    
 </div>
  );
}