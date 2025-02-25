"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Dev from "@/assets/deve.png";

const TEXTS = [
  {
    key: "amazing",
    className:
      "bg-gradient-to-r from-[#ff1835] to-[#ffc900] bg-clip-text text-transparent",
  },
  {
    key: "stunning",
    className:
      "bg-gradient-to-r from-[#0077ff] to-[#00e7df] bg-clip-text text-transparent",
  },
  {
    key: "fantastic",
    className:
      "bg-gradient-to-r from-[#7f00de] to-[#ff007f] bg-clip-text text-transparent",
  },
  {
    key: "attractive",
    className:
      "bg-gradient-to-r from-[#2ecc70] to-[#1ca085] bg-clip-text text-transparent",
  },
];

const SPEED = 2;

const variants = {
  enter: { y: 100, opacity: 0 },
  center: { y: 0, opacity: 1 },
  exit: { y: -100, opacity: 0 },
};

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % TEXTS.length);
    }, SPEED * 1000);
    return () => clearInterval(timer);
  }, []);

  const textItem = TEXTS[currentIndex];
  if (!textItem) return null;

  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      setTime(new Date().toLocaleTimeString("en-US", { timeZone: "Asia/Karachi" }));
    };

    updateTime(); 
    const interval = setInterval(updateTime, 1000); 

    return () => clearInterval(interval); 
  }, []);
  return (
    <>
      <div className="relative  max-w-[1010px] p-4  mx-auto mt-32 mb-16 flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Top Center Blurred Gradient Effect */}

        <div className="flex flex-col text-left pt-10  sm:text-left">
          <h1 className="flex max-w-[550px] flex-wrap text-zinc-800 dark:text-zinc-200 gap-2 text-xl lg:text-[30px] font-bold sm:text-xl">
            <div className="text-3xl lg:text-5xl ">
              I&apos;m Muhammad Sumair,
            </div>
            <div className="flex flex-wrap gap-2">
              <motion.div
                layout
                key="title-middle-left"
                className="text-2xl mt-1 font-bold lg:text-5xl whitespace-nowrap"
              >
                a Full Stack Developer
              </motion.div>
              <div className="relative mt-2 overflow-hidden font-bold flex-wrap text-2xl  sm:text-3xl lg:text-5xl flex gap-x-2 min-w-0">
                building
                <AnimatePresence mode="popLayout">
                  <motion.div
                    key={currentIndex}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    layout
                    transition={{ type: "tween", duration: 0.3 }}
                    className="inline-flex items-center font-bold justify-center whitespace-nowrap"
                  >
                    <span className={textItem.className}>
                      {textItem.key.charAt(0).toUpperCase() +
                        textItem.key.slice(1)}
                    </span>
                  </motion.div>
                </AnimatePresence>
                <div className="flex flex-wrap items-center font-semibold text-zinc-800 dark:text-zinc-400 gap-x-2 mt-3 text-2xl lg:text-3xl">
                  <motion.div
                    layout
                    key="title-middle-right"
                    className="whitespace-nowrap"
                  >
                    <span className="text-2xl lg:text-4xl ">
                      websites using
                    </span>
                  </motion.div>
                  <h2 className="whitespace-nowrap -mb-2 text-3xl">
                    React & Next
                  </h2>
                </div>
              </div>
            </div>
          </h1>
          <div className="text-sm font-mono text-gray-400 mt-4">
          MS DEV / {time}
          </div>
        </div>

        <motion.div
          className="relative  size-64 lg:size-80 hidden md:block -m-0 lg:-mr-12 rounded-full"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Image
            src={Dev}
            className="rounded-full absolute   grayscale hover:grayscale-0 transition-all duration-1000"
            width={320}
            height={280}
            alt="Profile"
            priority
          />
          <div className="absolute right-28 mt-16 w-44 ml-4 -z-10 bg-gradient-to-tl from-purple-800 to-orange-800 dark:opacity-35 opacity-40 h-72 blur-3xl" />
        </motion.div>
      </div>
    </>
  );
}
