"use client"

import React, { useEffect, useState } from "react"
import techStacks from "@/data/tech"
import { Card, CardContent } from "@/components/ui/card"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

const TechSkills = () => {
  const [isHovered, setIsHovered] = useState<number | null>(null)
  const [mounted, setMounted] = useState(false)

  // Split tech stacks into two rows for alternating animations
  const firstRow = techStacks.slice(0, Math.ceil(techStacks.length / 2))
  const secondRow = techStacks.slice(Math.ceil(techStacks.length / 2))

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <Card className="bg-gradient-to-l to-zinc-950/80 from-zinc-950/90 text-white border-zinc-800 w-full overflow-hidden ">
      <CardContent className="py-6 px-4 relative">
        {/* Background gradient animation */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-transparent to-orange-500/10 opacity-30 animate-gradient" />

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
                className="w-6 h-6 animate-bounce"
              >
                <path d="m6 17 2-5-2-5" />
                <path d="m2 17 2-5-2-5" />
                <path d="m14 17 2-5-2-5" />
                <path d="m18 17 2-5-2-5" />
              </svg>
              <div className="absolute inset-0 bg-white/20 blur-xl rounded-full" />
            </div>
            <h2 className="font-bold text-2xl bg-gradient-to-r from-white via-gray-200 to-gray-400 text-transparent bg-clip-text">
              Our Tech Stack
            </h2>
          </div>

          {/* Tech stack rows with marquee effect */}
          <div className="flex flex-col gap-8 ">
            {/* First row - left to right */}
            <div className="flex gap-6 animate-marquee ">
              <TechRow items={firstRow} isHovered={isHovered} setIsHovered={setIsHovered} />
              <TechRow items={firstRow} isHovered={isHovered} setIsHovered={setIsHovered} />
            </div>

            {/* Second row - right to left */}
            <div className="flex gap-6 animate-marquee-reverse">
              <TechRow items={secondRow} isHovered={isHovered} setIsHovered={setIsHovered} />
              <TechRow items={secondRow} isHovered={isHovered} setIsHovered={setIsHovered} />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

const TechRow = ({ 
  items, 
  isHovered, 
  setIsHovered 
}: { 
  items: typeof techStacks,
  isHovered: number | null,
  setIsHovered: (index: number | null) => void
}) => {
  return (
    <div className="flex gap-6 min-w-full px-12">
      {items.map((tech, i) => (
        <TooltipProvider key={i} delayDuration={100}>
          <Tooltip>
            <TooltipTrigger asChild>
              <div
                className={cn(
                  "group relative aspect-square w-24 bg-zinc-800/50 backdrop-blur-sm",
                  "hover:scale-110 hover:bg-black/80 shadow-lg transition-all duration-300",
                  "rounded-xl flex items-center justify-center p-2 shrink-0",
                  "border border-white/5 hover:border-white/20"
                )}
                onMouseEnter={() => setIsHovered(i)}
                onMouseLeave={() => setIsHovered(null)}
              >
                {/* Glow effect */}
                <div className={cn(
                  "absolute inset-0 rounded-xl opacity-0 transition-opacity duration-500",
                  "bg-gradient-to-r from-purple-500/30 via-fuchsia-500/30 to-orange-500/30 blur-xl",
                  isHovered === i && "opacity-100"
                )} />

                <div className={cn(
                  "relative w-full h-full transition-transform duration-300",
                  tech.className,
                  "group-hover:scale-110"
                )}>
                  {React.cloneElement(tech.svg, {
                    className: "w-full h-full fill-zinc-200 transition-colors duration-300 group-hover:fill-white p-1",
                  })}
                </div>
              </div>
            </TooltipTrigger>
            <TooltipContent 
              className="bg-black/90 border-zinc-800/50 backdrop-blur-md text-white"
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
