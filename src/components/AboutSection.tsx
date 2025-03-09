"use client";

import { MapPinIcon, LinkIcon, ClockIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Map from "./common/Map";
import React from "react";
import TechSkills from "./reuseable/skills";
import { CONNECT_LINKS_ABOUT } from "@/config/Link";
import Link from "next/link";
import { useState, useEffect } from "react";

const calculateCodingHours = () => {
  const startDate = new Date("2023-06-29");
  const today = new Date();
  const timeDiff = today.getTime() - startDate.getTime();
  const daysPassed = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  return daysPassed * 4; 
};


export default function AboutSection() {
  const [codingHours, setCodingHours] = useState(0);

  useEffect(() => {
    setCodingHours(calculateCodingHours());
  }, []);

  return (
    <div className="m-auto relative max-w-[1010px] mb-12 mt-4 mx-auto p-4 space-y-6">
      <h2 className="text-4xl font-bold mb-10 text-zinc-900 dark:text-zinc-200 text-center m-auto">
        About Me
      </h2>
      {/* Background effect */}
      <div className="absolute -right-72 -top-8 transform -translate-x-1/2 h-[230px] w-[650px] bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 blur-3xl opacity-30 dark:from-purple-900 dark:via-pink-950 dark:to-orange-900 dark:opacity-40 -z-10"></div>

      {/* Grid container */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Location Card */}
        <Card className="bg-white dark:bg-zinc-950 text-black dark:text-white border border-zinc-300 dark:border-zinc-500 shadow-lg rounded-xl">
          <CardContent>
            <div className="flex items-center gap-2 p-4">
              <MapPinIcon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              <span>Karachi, Sindh</span>
            </div>
            <div className="relative h-[200px] w-full overflow-hidden rounded-lg">
              <Map className="h-full w-full" />
            </div>
          </CardContent>
        </Card>

        {/* Coding Hours Card */}
        <Card className="bg-white dark:bg-zinc-950 text-black dark:text-white border border-zinc-300 dark:border-zinc-500 shadow-lg rounded-xl">
          <CardContent className="p-6 h-full flex flex-col">
            <div className="flex items-center gap-2 mb-4">
              <ClockIcon className="w-5 h-5 text-blue-500 dark:text-blue-400" />
              <span className="text-lg font-semibold">Coding Hours</span>
            </div>

            <div className="text-4xl font-bold text-gray-700 dark:text-zinc-400 mt-auto">
            {codingHours} hrs
            </div>

            <div className="mt-4">
              <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mb-1">
              <span>Goal: 4000 hrs</span>
              <span>{Math.min(parseFloat(((codingHours / 4000) * 100).toFixed(1)), 100)}%</span>
              </div>
              <div className="w-full bg-gray-300 dark:bg-gray-700 rounded-full h-2.5">
            <div
              className="bg-teal-600 dark:bg-teal-800 h-2.5 rounded-full"
              style={{ width: `${Math.min((codingHours / 4000) * 100, 100)}%` }}
            ></div>
          </div>
            </div>

            <p className="mt-4 text-xs italic text-gray-500 dark:text-gray-400">
              Consistency is the key to mastery.
            </p>
          </CardContent>
        </Card>

        {/* Connect Card */}
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
      </div>
      <TechSkills />
    </div>
  );
}
