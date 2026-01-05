import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import React from "react";

export default function LinkedInCustomCard() {
  return (
    <Card className="bg-white dark:bg-zinc-900 text-black dark:text-white border border-zinc-300 dark:border-zinc-700 shadow-lg rounded-xl w-full sm:w-[300px]">
      <CardContent className="flex flex-col items-start justify-start p-4 gap-2">
       <div className="w-16 h-16 -mb-10 overflow-hidden">
          <Image
            src="/LI-Logo.png" 
            alt="Muhammad Sumair"
            width={64}
            height={64}
            className="object-cover"
          />
        </div>
        {/* Profile Image */}
        <div className="w-16 h-16 rounded-full overflow-hidden">
          <Image
            src="/profile.png" 
            alt="Muhammad Sumair"
            width={64}
            height={64}
            className="object-cover"
          />
        </div>

        {/* Name & Title */}
        <div className="text-left space-y-0.5">
          <h3 className="text-base font-semibold">Muhammad Sumair</h3>
          <p className="text-xs text-gray-500 font-normal dark:text-gray-300 leading-tight">
            Full Stack Developer | Built E-commerce & SaaS Solutions for 10+ International Clients
          </p>
          <p className="text-xs text-gray-600 dark:text-gray-400 leading-tight">
            MERN Stack • Next.js • TypeScript • Remote & Available
          </p>
        </div>

        {/* LinkedIn Button */}
        <Link
          href="https://www.linkedin.com/in/muhammad-sumair-developer/"
          target="_blank"
          className="mt-1 px-4 py-1.5 border border-blue-600 dark:border-gray-400 text-blue-600 rounded-full text-xs font-semibold hover:bg-zinc-800 hover:text-zinc-100 transition-colors"
        >
          View profile
        </Link>
      </CardContent>
    </Card>
  );
}