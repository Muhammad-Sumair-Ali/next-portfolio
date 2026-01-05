"use client";

import {  LinkIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import React from "react";
import TechSkills from "./reuseable/skills";
import { CONNECT_LINKS_ABOUT } from "@/config/Link";
import Link from "next/link";
import LinkedInCard from "./cards/LinkedinCard";
import GitHubCustomCard from "./cards/GithubCard";

export default function AboutSection() {
  return (
    <div className="m-auto relative max-w-[1010px] mb-12 mt-4 mx-auto p-4 space-y-6">
      <h2 className="text-4xl font-semibold mb-10 text-zinc-900 dark:text-zinc-200 text-center m-auto">
        About Me
      </h2>

      {/* Background effect */}
      <div className="absolute -right-72 -top-8 transform -translate-x-1/2 h-[230px] w-[650px] bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 blur-3xl opacity-30 dark:from-purple-900 dark:via-pink-950 dark:to-orange-900 dark:opacity-40 -z-10"></div>

      {/* Grid container */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      
        <Card className="bg-white dark:bg-zinc-950 text-black dark:text-white border border-zinc-300 dark:border-zinc-500 shadow-lg rounded-xl">
          <CardContent className="p-6 h-full flex flex-col">
            <div className="flex items-center gap-2 mb-4">
              <LinkIcon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              <span className="text-lg font-semibold">Connect</span>
            </div>
            <div className="space-y-4 flex-1">
              {CONNECT_LINKS_ABOUT.map((item, index) => (
                <Link
                  target="_blank"
                  rel="noopener noreferrer"
                  key={index}
                  href={item.url}
                  className="flex items-center gap-3 text-gray-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors"
                >
                  {item.icon}
                  <span>{item.text}</span>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
        {/* profile Card */}

        <LinkedInCard />

       

        <GitHubCustomCard/>
      </div>

      <TechSkills />
    </div>
  );
}
