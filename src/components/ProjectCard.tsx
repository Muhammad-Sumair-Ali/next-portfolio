"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, Info } from "lucide-react";

interface Project {
  _id: string;
  title: string;
  description: string;
  longDescription?: string;
  imageUrl: string;
  tags: string[];
  demoLink?: string;
  githubLink?: string;
}

export function ProjectCard({ project }: { project: Project }) {
  const {
    title,
    description,
    longDescription,
    imageUrl,
    demoLink,
    githubLink,
    tags,
    _id,
  } = project;
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Check initially
    checkMobile();

    // Add event listener
    window.addEventListener("resize", checkMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <motion.div
      className="flex flex-col h-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="group h-[500px] flex flex-col relative overflow-hidden rounded-xl border dark:border-zinc-800 bg-gradient-to-br from-white to-gray-200 dark:from-zinc-800 dark:to-zinc-900 shadow-xl transition-all duration-300 hover:shadow-2xl dark:hover:shadow-zinc-800/20">
        <div className="absolute inset-0 bg-gradient-to-t from-gray-200 via-white/90 to-transparent dark:from-zinc-900 dark:via-black/80 dark:to-transparent opacity-60 transition-opacity group-hover:opacity-100" />

        {/* Card Image */}
        <Link href={`/project/${_id}`}>
          <div className="relative  aspect-video cursor-pointer overflow-hidden">
            <Image
              priority={false}
              src={imageUrl}
              alt={title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-white/10 dark:bg-black/50 opacity-0 transition-opacity group-hover:opacity-100" />
          </div>
        </Link>

        <CardContent className="relative z-10 px-4 py-4 md:p-6 flex-grow overflow-hidden">
          <Link href={`/project/${_id}`}>
          <motion.h3 className="mb-2 text-2xl font-semibold text-zinc-900 dark:text-white dark:hover:text-blue-500 hover:text-blue-500 hover:underline cursor-pointer line-clamp-1">
            {title}
          </motion.h3>{" "}
          </Link>
          {/* Tags */}{" "}
          <motion.div className="flex flex-wrap gap-2 mb-3 relative">
            {/* Show all tags on mobile, limit on larger screens */}
            {(isMobile ? tags : tags.slice(0, 8)).map((tag, index) => (
              <span
                key={`${tag}-${index}`}
                className="rounded-full bg-gray-300 dark:bg-zinc-800 px-3 py-1 text-xs font-medium text-black dark:text-zinc-200 transition-colors hover:bg-gray-400 dark:hover:bg-zinc-700"
              >
                {tag}
              </span>
            ))}
            {!isMobile && tags.length > 8 && (
                        <Link href={`/project/${_id}`}>
              <span
                className="rounded-full bg-gray-300 dark:hover:text-blue-500 hover:text-blue-500 hover:underline dark:bg-zinc-800 px-3 py-1 text-xs font-medium text-black dark:text-zinc-200 transition-colors hover:bg-gray-400 dark:hover:bg-zinc-700 cursor-pointer" >
                +{tags.length - 8} more...
              </span>
                  </Link>
            )}
          </motion.div>
          <motion.p className="text-sm text-gray-700 dark:text-zinc-300 line-clamp-2">
            {description}
          </motion.p>
        </CardContent>

        {/* Card Footer */}
        <CardFooter className="relative z-10 flex justify-between gap-2 py-4 px-4 md:p-6 pt-0 mt-auto">
          <div className="flex gap-2">
            {demoLink ? (
              <Button
                asChild
                size="sm"
                className="bg-zinc-700 text-zinc-200 hover:bg-zinc-400 hover:text-zinc-900"
              >
                <Link href={demoLink} target="_blank">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Live Demo
                </Link>
              </Button>
            ) : (
              <Button
                disabled
                size="sm"
                className="bg-zinc-700 text-zinc-200 opacity-50 cursor-not-allowed"
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                Live Demo
              </Button>
            )}

            {githubLink ? (
              <Button
                asChild
                size="sm"
                className="bg-zinc-700 text-zinc-200 hover:bg-zinc-400 hover:text-zinc-900"
              >
                <Link href={githubLink} target="_blank">
                  <Github className="mr-2 h-4 w-4" />
                  View Code
                </Link>
              </Button>
            ) : (
              <Button
                disabled
                size="sm"
                className="bg-zinc-700 text-zinc-200 opacity-50 cursor-not-allowed"
              >
                <Github className="mr-2 h-4 w-4" />
                View Code
              </Button>
            )}
          </div>
          <Link href={`/project/${_id}`}>
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-600 dark:hover:text-blue-500 hover:text-blue-500 hover:underline dark:text-zinc-400 hover:bg-gray-300 dark:hover:bg-zinc-800 bg-gray-200 dark:bg-zinc-800 rounded-lg "
            >
              <Info className="mr-2 h-4 w-4" />
              More <span className="hidden sm:block">Details</span>
            </Button>
          </Link>
        </CardFooter>
      </Card>

    </motion.div>
  );
}
