import {
  GithubIcon,
  FacebookIcon,
  InstagramIcon,
  TwitterIcon,
  YoutubeIcon,
  MapPinIcon,
  LinkIcon,
  ClockIcon,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Map from "./common/Map";
import techStacks from "@/data/tech";
import React from "react";
import TechSkills from "./reuseable/skills";

const connectLinks = [
  { icon: <GithubIcon className="w-5 h-5" />, text: "GitHub" },
  { icon: <FacebookIcon className="w-5 h-5" />, text: "Facebook" },
  { icon: <InstagramIcon className="w-5 h-5" />, text: "Instagram" },
  { icon: <TwitterIcon className="w-5 h-5" />, text: "X" },
  { icon: <YoutubeIcon className="w-5 h-5" />, text: "YouTube" },
];

export default function AboutSection() {
  return (
    <div className="m-auto relative max-w-[1010px] mb-12 mt-4 mx-auto p-4 space-y-4">
      <div className="absolute -right-72 -top-8 transform -translate-x-1/2 h-[230px] w-[650px] bg-gradient-to-r from-purple-900 via-pink-950 to-orange-900 blur-3xl opacity-40 -z-10"></div>

      {/* Grid container with improved responsive columns */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Location Card - Added overflow-hidden */}
        <Card className="bg-zinc-950 text-white border-zinc-500 border overflow-hidden">
          <CardContent>
            <div className="flex  items-center gap-2 p-4">
              <MapPinIcon className="w-4 h-4" />
              <span>Karachi, Sindh</span>
            </div>
            <div className=" relative h-[200px] w-full overflow-hidden rounded-lg">
              <Map className={"h-full w-full"} />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-zinc-950 text-white border-zinc-500 h-full border rounded-2xl">
          <CardContent className="p-6 h-full flex flex-col">
            <div className="flex items-center gap-2 mb-4">
              <ClockIcon className="w-4 h-4 text-blue-400" />
              <span className="text-xl font-semibold">Coding Hours</span>
            </div>

            <div className="text-4xl font-bold text-zinc-400 mt-auto">
              3873 hrs
            </div>

            <div className="mt-4">
              <div className="flex justify-between text-sm text-gray-400 mb-1">
                <span>Goal: 4000 hrs</span>
                <span>97%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2.5">
                <div
                  className="bg-teal-800 h-2.5 rounded-full"
                  style={{ width: "97%" }}
                ></div>
              </div>
            </div>

            <p className="mt-4 text-xs italic text-gray-400">
              Consistency is the key to mastery.
            </p>
          </CardContent>
        </Card>

        {/* Connect Card - Fixed height for consistency */}
        <Card className="bg-zinc-950  text-white border-zinc-500 border h-full">
          <CardContent className="p-6 h-full flex flex-col">
            <div className="flex items-center gap-2 mb-4">
              <LinkIcon className="w-4 h-4" />
              <span>Connect</span>
            </div>
            <div className="space-y-4 flex-1">
              {connectLinks.map((item, index) => (
                <a
                  key={index}
                  href="#"
                  className="flex items-center gap-3 text-zinc-400 hover:text-white transition-colors"
                >
                  {item.icon}
                  <span>{item.text}</span>
                </a>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      <TechSkills />
    </div>
  );
}
