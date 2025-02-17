"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Code from "@/assets/code.jpg";
import Image from "next/image";

export default function AnimatedTechSection() {
  return (
    <div className="relative">
      <div className="absolute -bottom-36 -right-28  transform -translate-x-1/2 h-[230px] w-[650px] bg-gradient-to-r from-purple-800 via-pink-800 to-orange-800 blur-3xl opacity-20 -ml-20 -z-10"></div>

      <div className=" max-w-[990px]  mx-auto mt-20 mb-24 ">
        <section className="flex max-h-[330px]  items-center  justify-between gap-2 px-6  bg-gradient-to-l to-slate-950/65 bg-black/50  backdrop-blur-lg shadow-2xl rounded-2xl  border border-zinc-700/50">
          {/* Floating badges and image */}
          <div className="relative w-1/2 h-96 flex items-center justify-center">
            {/* React.js Badge */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute left-12 top-14"
            >
              <Badge
                variant="secondary"
                className="bg-zinc-800/90 text-zinc-300 hover:bg-zinc-700/90 transition-all shadow-sm border border-zinc-700/50"
              >
                React.js
              </Badge>
            </motion.div>

            {/* JavaScript Badge */}
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute left-14 top-36"
            >
              <Badge
                variant="secondary"
                className="bg-zinc-800/90 text-zinc-300 hover:bg-zinc-700/90 transition-all shadow-sm border border-zinc-700/50"
              >
                JavaScript
              </Badge>
            </motion.div>

            {/* TypeScript Badge */}
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{
                duration: 4.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute right-14 top-16"
            >
              <Badge
                variant="secondary"
                className="bg-zinc-800/90 text-zinc-300 hover:bg-zinc-700/90 transition-all shadow-sm border border-zinc-700/50"
              >
                TypeScript
              </Badge>
            </motion.div>

            {/* Next.js Badge */}
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute right-14 bottom-28"
            >
              <Badge
                variant="secondary"
                className="bg-zinc-800/90 text-zinc-300 hover:bg-zinc-700/90 transition-all shadow-sm border border-zinc-700/50"
              >
                Next.js
              </Badge>
            </motion.div>

            {/* Tailwind CSS Badge */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{
                duration: 4.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute left-24 bottom-20"
            >
              <Badge
                variant="secondary"
                className="bg-zinc-800/90 text-zinc-300 hover:bg-zinc-700/90 transition-all shadow-sm border border-zinc-700/50"
              >
                Tailwind CSS
              </Badge>
            </motion.div>

            {/* Node.js Badge */}
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{
                duration: 3.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute right-24 bottom-14"
            >
              <Badge
                variant="secondary"
                className="bg-zinc-800/90 text-zinc-300 hover:bg-zinc-700/90 transition-all shadow-sm border border-zinc-700/50"
              >
                Node.js
              </Badge>
            </motion.div>

            {/* Central Image */}
            <div className="w-40 h-40 rounded-full overflow-hidden bg-zinc-800/90 border-2 border-zinc-700/50 hover:border-zinc-600/70 transition-all">
              <Image
                src={Code}
                alt="Tech"
                className="w-full h-full object-cover transform hover:scale-110 transition-transform"
              />
            </div>
          </div>

          {/* Text Section */}
          <div className="w-1/2 text-left space-y-5">
            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-4xl font-bold text-white"
            >
              Ask Questions About{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                {" "}
                Web Development{" "}
              </span>
              ?
            </motion.h2>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-zinc-300 text-lg"
            >
              Whether you are just starting out or looking to dive deeper into
              Popular Stacks {","} I am here to help. Let us build something amazing
              together!
            </motion.p>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="flex items-center space-x-4"
            >
              <Button
                variant="destructive"
                className="bg-transparent border font-sans rounded-3xl border-zinc-700 text-zinc-300 hover:bg-zinc-800/50 hover:text-white transition-all"
                onClick={() =>
                  (window.location.href = "mailto:muhammadsumair224@gmail.com")
                }
              >
                GustBook
              </Button>
              <Button
                variant="outline"
                className="bg-transparent border font-serif rounded-3xl border-zinc-700 text-zinc-300 hover:bg-zinc-800/50 hover:text-white transition-all"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                  />
                </svg>
                MuhammadSumair225@gmail.com
              </Button>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
}
