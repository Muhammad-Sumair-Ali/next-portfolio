"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Code from "@/assets/code.jpg"
import Image from "next/image"

export default function AnimatedTechSection() {
  return (
    <div className="relative">
      <div
        className="absolute -bottom-36 -right-28 transform -translate-x-1/2 h-[230px] w-[650px] blur-3xl opacity-20 -ml-20 -z-10
          bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300
          dark:from-purple-800 dark:via-pink-800 dark:to-orange-800"
      ></div>

      <div className="max-w-[990px] mx-auto mt-20 mb-24">
        <section
          className="flex max-h-[330px] items-center justify-between gap-2 px-6 backdrop-blur-lg shadow-2xl rounded-2xl
            border border-gray-300 bg-white
            dark:bg-gradient-to-l dark:to-slate-950/65 dark:bg-black/50 dark:border-zinc-700/50"
        >
          {/* Floating badges and image */}
          <div className="relative w-1/2 h-96 flex items-center justify-center">
            {[
              { text: "React.js", className: "left-12 top-14" },
              { text: "JavaScript", className: "left-14 top-36" },
              { text: "TypeScript", className: "right-14 top-16" },
              { text: "Next.js", className: "right-14 bottom-28" },
              { text: "Tailwind CSS", className: "left-24 bottom-20" },
              { text: "Node.js", className: "right-24 bottom-14" },
            ].map((badge, index) => (
              <motion.div
                key={badge.text}
                animate={{ y: [0, index % 2 === 0 ? -10 : 10, 0] }}
                transition={{ duration: 4 + index * 0.2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                className={`absolute ${badge.className}`}
              >
                <Badge
                  variant="secondary"
                  className="transition-all shadow-sm border
                    bg-gray-200 text-gray-700 hover:bg-gray-300 border-gray-400
                    dark:bg-zinc-800/90 dark:text-zinc-300 dark:hover:bg-zinc-700/90 dark:border-zinc-700/50"
                >
                  {badge.text}
                </Badge>
              </motion.div>
            ))}

            {/* Central Image */}
            <div
              className="w-40 h-40 rounded-full overflow-hidden border-2 transition-all
                bg-gray-200 border-gray-400 hover:border-gray-500
                dark:bg-zinc-800/90 dark:border-zinc-700/50 dark:hover:border-zinc-600/70"
            >
              <Image
                src={Code || "/placeholder.svg"}
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
              className="text-4xl font-bold text-gray-900 dark:text-white"
            >
              Ask Questions About
              <span className="text-transparent bg-clip-text mr-1 bg-gradient-to-r from-blue-400 to-purple-500">
                {" Web Development"}
              </span>
              ?
            </motion.h2>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-gray-700 dark:text-zinc-300 text-lg"
            >
              Whether you are just starting out or looking to dive deeper into Popular Stacks, I am here to help. Let us
              build something amazing together!
            </motion.p>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="flex items-center space-x-4"
            >
              <Button
                variant="destructive"
                className="border font-sans rounded-3xl transition-all
                  bg-transparent border-gray-400 text-gray-700 hover:bg-gray-200
                  dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800/50 dark:hover:text-white"
                onClick={() => (window.location.href = "mailto:muhammadsumair224@gmail.com")}
              >
                GuestBook
              </Button>
              <Button
                variant="outline"
                className="border font-serif rounded-3xl transition-all flex items-center space-x-2
                  bg-transparent border-gray-400 text-gray-700 hover:bg-gray-200
                  dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800/50 dark:hover:text-white"
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
                    d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25"
                  />
                </svg>
                MuhammadSumair225@gmail.com
              </Button>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  )
}

