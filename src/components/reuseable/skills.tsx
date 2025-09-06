"use client"

import React, { useEffect, useState } from "react"

import { Card, CardContent } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import techStacks from "@/data/tech"


const TechSkills = () => {
  const [isHovered, setIsHovered] = useState<number | null>(null)
  const [mounted, setMounted] = useState(false)

  const firstRow = techStacks.slice(0, Math.ceil(techStacks.length / 2))
  const secondRow = techStacks.slice(Math.ceil(techStacks.length / 2))

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <Card className="bg-white dark:bg-zinc-950 w-full md:w-[990px] overflow-hidden border-2 shadow-black/10 dark:shadow-zinc-700">
      <CardContent className="px-3 py-6 md:p-6 relative">
        {/* Background gradient animation */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-transparent to-orange-500/5 dark:from-purple-500/10 dark:via-transparent dark:to-orange-500/10 opacity-30 animate-gradient" />

        <div className="relative">
          {/* Header */}
          <div className="flex items-center gap-3 mb-4 -mt-2">
            <div className="relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-6 h-6 animate-bounce text-gray-800 dark:text-white"
              >
                <path d="m6 17 2-5-2-5" />
                <path d="m2 17 2-5-2-5" />
                <path d="m14 17 2-5-2-5" />
                <path d="m18 17 2-5-2-5" />
              </svg>
              <div className="absolute inset-0 bg-black/10 dark:bg-white/20 blur-xl rounded-full" />
            </div>
            <h2 className="font-bold text-xl md:text-2xl bg-gradient-to-r from-gray-900 via-gray-700 to-gray-800 dark:from-white dark:via-gray-200 dark:to-gray-400 text-transparent bg-clip-text">
              Our Tech Stack
            </h2>
          </div>

          {/* Tech stack rows with marquee effect */}
          <div className="flex flex-col gap-4">
            {/* First row - left to right */}
            <div className="flex overflow-hidden relative">
              <div className="flex animate-marquee-infinite whitespace-nowrap">
                <TechRow items={firstRow} isHovered={isHovered} setIsHovered={setIsHovered} />
                <TechRow items={firstRow} isHovered={isHovered} setIsHovered={setIsHovered} />
                <TechRow items={firstRow} isHovered={isHovered} setIsHovered={setIsHovered} />
                <TechRow items={firstRow} isHovered={isHovered} setIsHovered={setIsHovered} />
              </div>
            </div>

            {/* Second row - right to left */}
            <div className="flex overflow-hidden relative">
              <div className="flex animate-marquee-infinite-reverse whitespace-nowrap">
                <TechRow items={secondRow} isHovered={isHovered} setIsHovered={setIsHovered} />
                <TechRow items={secondRow} isHovered={isHovered} setIsHovered={setIsHovered} />
                <TechRow items={secondRow} isHovered={isHovered} setIsHovered={setIsHovered} />
                <TechRow items={secondRow} isHovered={isHovered} setIsHovered={setIsHovered} />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export const TechRow = ({
  items,
  isHovered,
  setIsHovered,
}: {
  items: typeof techStacks
  isHovered: number | null
  setIsHovered: (index: number | null) => void
}) => {
  return (
    <div className="flex gap-4  md:gap-6 px-4">
      {items.map((tech, i) => (
        <TooltipProvider key={`tech-${i}`} delayDuration={100}>
          <Tooltip>
            <TooltipTrigger asChild>
              <div
                className={cn(
                  "group relative aspect-square w-[70px] md:w-20 backdrop-blur-sm",
                  "hover:scale-110 bg-white/5 hover:bg-white/10 dark:bg-transparent dark:hover:bg-black/80 shadow-lg transition-all duration-300",
                  "rounded-xl flex items-center justify-center p-2 shrink-0",
                  "border border-black/5 hover:border-black/10 dark:border-white/5 dark:hover:border-white/20",
                )}
                onMouseEnter={() => setIsHovered(i)}
                onMouseLeave={() => setIsHovered(null)}
              >
                {/* Glow effect */}
                <div
                  className={cn(
                    "absolute inset-0 rounded-xl opacity-0 transition-opacity duration-500",
                    isHovered === i && "opacity-100",
                  )}
                />

                <div
                  className={cn(
                    "relative w-full h-full transition-transform duration-300",
                    tech.className,
                    "group-hover:scale-110",
                  )}
                >
                  {React.cloneElement(tech.svg, {
                    className: cn(
                      "w-full h-full fill-zinc-700 transition-colors duration-300 group-hover:fill-zinc-900",
                      "dark:fill-zinc-200 dark:group-hover:fill-white p-1",
                    ),
                  })}
                </div>
              </div>
            </TooltipTrigger>
            <TooltipContent
              className="bg-white dark:bg-black/90 border-zinc-200 dark:border-zinc-800/50 backdrop-blur-md text-gray-900 dark:text-white"
              sideOffset={4}
            >
              <span className="font-medium">{tech.title}</span>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}
    </div>
  )
}

export default TechSkills

