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
        <Card className="bg-black text-white border-zinc-800 overflow-hidden">
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

        <Card className="bg-black text-white border-zinc-800 h-full shadow-lg rounded-2xl">
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
              "Consistency is the key to mastery."
            </p>
          </CardContent>
        </Card>

        {/* Connect Card - Fixed height for consistency */}
        <Card className="bg-black text-white border-zinc-800 h-full">
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

      <Card className="bg-gradient-to-l to-slate-950/50 bg-black/50  text-white border-zinc-800 w-full h-full">
        <CardContent className="p-6 h-full">
          <div className="flex items-center  gap-2 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5 animate-bounce" // Bounce animation for the icon
            >
              <path d="m6 17 2-5-2-5" />
              <path d="m2 17 2-5-2-5" />
              <path d="m14 17 2-5-2-5" />
              <path d="m18 17 2-5-2-5" />
            </svg>
            <p className="font-semibold text-xl text-gray-200 transition-all duration-500">
              Our Tech Stacks
            </p>
          </div>
          <div className="grid grid-cols-5 md:grid-cols-10 gap-3">
            {techStacks.map((tech, i) => (
              <div
                key={i}
                className="aspect-square relative w-full bg-zinc-800 hover:scale-110 hover:bg-black shadow-md  transition-all duration-300 rounded-lg flex items-center justify-center p-2 "
              >
                <div className="absolute left-16 -top-8 transform -translate-x-1/2 h-[130px] w-[90px] bg-gradient-to-t from-purple-800 via-fuchsia-800 to-orange-900 blur-3xl opacity-25 -z-10"></div>

                <div className={`w-full h-full ${tech.className}`}>
                  {React.cloneElement(tech.svg, {
                    className: "w-full h-full fill-zinc-200 ",
                  })}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
