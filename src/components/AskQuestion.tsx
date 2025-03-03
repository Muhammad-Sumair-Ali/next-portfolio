"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mail } from "lucide-react";
import Image from "next/image";
import Code from "@/assets/code.jpg";
import Link from "next/link";

export default function AskQuestions() {
  const badges = [
    { text: "React.js", className: "md:left-12 md:top-14" },
    { text: "JavaScript", className: "md:left-14 md:top-36" },
    { text: "TypeScript", className: "md:right-14 md:top-16" },
    { text: "Next.js", className: "md:right-14 md:bottom-28" },
    { text: "Tailwind CSS", className: "md:left-24 md:bottom-20" },
    { text: "Node.js", className: "md:right-24 md:bottom-14" },
  ];

  return (
    <div className="relative w-full px-4 py-2 md:py-16">
      {/* Background gradient */}
      <div
        className="absolute bottom-20 right-0 md:-right-28 transform md:-translate-x-1/2 h-[230px] w-full md:w-[650px] 
          blur-3xl opacity-20 -z-10 bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300
          dark:from-purple-800 dark:via-pink-800 dark:to-orange-800"
      />

      <div className="max-w-[990px] mx-auto">
        <section
          className="flex flex-col md:flex-row md:max-h-[330px] items-center justify-between gap-8 md:gap-2 p-6 
            backdrop-blur-lg shadow-2xl rounded-2xl border border-gray-300 bg-white/80
            dark:bg-gradient-to-l dark:from-black/95 dark:to-black dark:border-zinc-700/50"
        >
          {/* Floating badges and image */}
          <div className="relative w-full md:w-1/2 h-[200px]  md:h-96 flex items-center justify-center">
            {/* Responsive badge grid for mobile */}
            <div className="grid grid-cols-2 gap-9 z-50 -my-6 absolute inset-0 md:hidden place-items-center">
              {badges.map((badge, index) => (
                <motion.div
                  key={badge.text}
                  animate={{
                    y: [0, index % 2 === 0 ? -5 : 5, 0],
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 4 + index * 0.2,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                >
                  <Badge
                    variant="secondary"
                    className="transition-all shadow-sm border whitespace-nowrap
                      bg-gray-200 text-gray-700 hover:bg-gray-300 border-gray-400
                      dark:bg-zinc-800/90 dark:text-zinc-300 dark:hover:bg-zinc-700/90 dark:border-zinc-700/50"
                  >
                    {badge.text}
                  </Badge>
                </motion.div>
              ))}
            </div>

            {/* Desktop floating badges */}
            <div className="hidden md:block">
              {badges.map((badge, index) => (
                <motion.div
                  key={badge.text}
                  animate={{
                    y: [0, index % 2 === 0 ? -10 : 10, 0],
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 4 + index * 0.2,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                  className={`absolute ${badge.className}`}
                >
                  <Badge
                    variant="secondary"
                    className="transition-all shadow-sm lg:text-[16px] border
                      bg-gray-200 text-gray-700 hover:bg-gray-300 border-gray-400
                      dark:bg-zinc-800/90 dark:text-zinc-300 dark:hover:bg-zinc-700/90 dark:border-zinc-700/50"
                  >
                    {badge.text}
                  </Badge>
                </motion.div>
              ))}
            </div>

            {/* Central Image */}
            <div
              className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-2 transition-all
                bg-gray-200 border-gray-400 hover:border-gray-500 group
                dark:bg-zinc-800/90 dark:border-zinc-700/50 dark:hover:border-zinc-600/70"
            >
              <Image
                src={Code}
                priority={false}
                alt="Tech Stack Illustration"
                width={160}
                height={160}
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
              />
            </div>
          </div>

          {/* Text Section */}
          <div className="w-full md:w-1/2 text-left md:text-left space-y-5 my-6">
            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white"
            >
              Ask Questions About
              <span className="text-transparent my-1 pr-1 bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
                {" Web Development"}
              </span>
              ?
            </motion.h2>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-gray-700 dark:text-zinc-300 text-base md:text-lg"
            >
              Whether you are just starting out or looking to dive deeper into
              Popular Stacks, I am here to help. Let us build something amazing
              together!
            </motion.p>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="flex flex-col sm:flex-row  gap-4 justify-start"
            >
              <Link href="/guestbook">
                <Button
                  variant="destructive"
                  className="w-full  border font-sans rounded-3xl transition-all
                bg-transparent border-gray-400 text-gray-700 hover:bg-gray-200
                dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800/50 dark:hover:text-white"
                >
                  GuestBook
                </Button>
              </Link>
              <Button
                variant="outline"
                className="w-full sm:w-auto border font-serif rounded-3xl transition-all flex items-center gap-2
                  bg-black border-gray-400 text-gray-200 hover:bg-gray-200
                  dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800/50 dark:hover:text-white"
                onClick={() =>
                  (window.location.href = "mailto:muhammadsumair225@gmail.com")
                }
              >
                <Mail className="size-5" />
                <span className="truncate">MuhammadSumair225@gmail.com</span>
              </Button>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
}
