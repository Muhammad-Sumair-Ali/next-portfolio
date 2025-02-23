"use client"

import { useEffect } from "react"
import { motion, useAnimate } from "framer-motion"

interface HeadingProps {
  title: string;
  description: string;
}

const Heading = ({ title, description }: HeadingProps) => {
  const [scope, animate] = useAnimate()

  useEffect(() => {
    animate(scope.current, { opacity: 1, y: 0 }, { duration: 0.5, ease: "easeOut" });
    animate("hr", { scaleX: 1 }, { duration: 0.5, ease: "easeOut", delay: 0.3 });
  }, [animate, scope]);
  

  return (
    <motion.div ref={scope} initial={{ opacity: 0, y: 20 }}>
      <div className="mt-36 px-8 mb-16 max-w-[1010px] m-auto">
        <div className="text-left flex items-start flex-col">
          <motion.h1
            className="text-5xl font-bold bg-gradient-to-br from-zinc-900 to-zinc-600 dark:from-white dark:to-zinc-600 bg-clip-text text-transparent mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {title}
          </motion.h1>
          <motion.p
            className="text-lg text-zinc-800 font-semibold dark:text-gray-400"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
          >
            {description}
          </motion.p>
        </div>
      </div>
      <motion.hr
        className="-mt-4 border-zinc-200 dark:border-gray-700"
        initial={{ scaleX: 0 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
      />
    </motion.div>
  )
}

export default Heading

