"use client"

import { useEffect } from "react"
import { motion, useAnimate } from "framer-motion"

const Heading = ({ title, description }) => {
  const [scope, animate] = useAnimate()

  useEffect(() => {
    animate(scope.current, { opacity: 1, y: 0 }, { duration: 0.5, ease: "easeOut" })
    animate("hr", { scaleX: 1 }, { duration: 0.5, ease: "easeOut", delay: 0.3 })
  }, [animate, scope.current])
  return (
    <motion.div ref={scope} initial={{ opacity: 0, y: 20 }}>
      <div className="mt-36 px-8 mb-20 max-w-[1010px] m-auto">
        <div className="text-left flex items-start flex-col">
          <motion.h1
            className="text-5xl font-bold text-white dark:text-gray-200 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {title}
          </motion.h1>
          <motion.p
            className="text-lg text-gray-300 dark:text-gray-400"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
          >
            {description}
          </motion.p>
        </div>
      </div>
      <motion.hr
        className="-mt-4 border-zinc-800 dark:border-gray-700"
        initial={{ scaleX: 0 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
      />
    </motion.div>
  )
}

export default Heading

