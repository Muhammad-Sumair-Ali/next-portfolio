"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ExternalLink, Github, Info } from "lucide-react";

import Pic from "@/assets/Feature.jpg";

interface Project {
  title: string;
  description: string;
  longDescription?: string;
  image?: string;
  liveUrl?: string;
  githubUrl?: string;
  tags: string[];
}

export function ProjectCard({ project }: { project: Project }) {
  const {
    title,
    description,
    longDescription,
    image,
    liveUrl,
    githubUrl,
    tags,
  } = project;
  const [showDetails, setShowDetails] = useState(false);

  return (
    <motion.div
      className="flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="group relative overflow-hidden rounded-xl border dark:border-zinc-800 bg-gradient-to-br from-white to-gray-200 dark:from-zinc-800 dark:to-zinc-900 shadow-xl transition-all duration-300 hover:shadow-2xl dark:hover:shadow-zinc-800/20">
        <div className="absolute inset-0 bg-gradient-to-t from-gray-200 via-white/90 to-transparent dark:from-zinc-900 dark:via-black/80 dark:to-transparent opacity-60 transition-opacity group-hover:opacity-100" />

        <div className="relative aspect-video cursor-pointer overflow-hidden">
          <Image
            src={Pic || image}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-white/10 dark:bg-black/50 opacity-0 transition-opacity group-hover:opacity-100" />
        </div>

        <CardContent className="relative z-10 px-4 py-4 md:p-6">
          <motion.h3
            className="mb-2 text-2xl font-bold text-black dark:text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {title}
          </motion.h3>

          <motion.div
            className="flex flex-wrap gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {tags.map((tag, index) => (
              <span
                key={`${tag}-${index}`}
                className="rounded-full bg-gray-300 dark:bg-zinc-800 px-3 py-1 text-xs font-medium text-black dark:text-zinc-200 transition-colors hover:bg-gray-400 dark:hover:bg-zinc-700"
              >
                {tag}
              </span>
            ))}
          </motion.div>

          <motion.p
            className="mt-4 text-sm text-gray-700 dark:text-zinc-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {description}
          </motion.p>
        </CardContent>

        <CardFooter className="relative z-10 flex justify-between gap-2 py-4 px-4 md:p-6 pt-0">
          <div className="flex gap-2">
            {liveUrl && (
              <Button
                asChild
                size="sm"
                className="  bg-zinc-700  text-zinc-200 hover:bg-zinc-400 hover:text-zinc-900"
              >
                <Link href={liveUrl} target="_blank">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Live Demo
                </Link>
              </Button>
            )}
            {githubUrl && (
              <Button
                asChild
                size="sm"
                className="  bg-zinc-700  text-zinc-200 hover:bg-zinc-400 hover:text-zinc-900"
              >
                <Link href={githubUrl} target="_blank">
                  <Github className="mr-2 h-4 w-4" />
                  View Code
                </Link>
              </Button>
            )}
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-600 dark:text-zinc-400 hover:bg-gray-300 dark:hover:bg-zinc-800 bg-gray-200 dark:bg-zinc-800 rounded-lg hover:text-black dark:hover:text-zinc-200"
            onClick={() => setShowDetails(true)}
          >
            <Info className="mr-2 h-4 w-4" />
            More
          </Button>
        </CardFooter>
      </Card>

      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="max-w-2xl border-0 bg-white dark:bg-zinc-900 text-black dark:text-white">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold">{title}</DialogTitle>
          </DialogHeader>
          <div className="relative aspect-video w-full h-44 overflow-hidden rounded-lg">
            <Image
              src={Pic || "/placeholder.svg"}
              alt={title}
              fill
              className="object-contain bg-gray-200 dark:bg-zinc-800"
            />
          </div>
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <span
                  key={`${tag}-${index}`}
                  className="rounded-full bg-gray-300 dark:bg-zinc-800 px-3 py-1 text-xs font-medium text-black dark:text-zinc-200 transition-colors hover:bg-gray-400 dark:hover:bg-zinc-700"
                >
                  {tag}
                </span>
              ))}
            </div>
            <p className="text-gray-700 dark:text-zinc-300">
              {longDescription || description}
            </p>
            <div className="flex gap-4">
              {liveUrl && (
                <Button
                  asChild
                  variant="default"
                  className="w-full bg-zinc-800 dark:bg-black"
                >
                  <Link href={liveUrl} target="_blank">
                    <ExternalLink className="mr-2 h-5 w-5" />
                    Live Demo
                  </Link>
                </Button>
              )}
              {githubUrl && (
                <Button
                  asChild
                  variant="outline"
                  className="w-full text-black dark:text-white"
                >
                  <Link href={githubUrl} target="_blank">
                    <Github className="mr-2 h-5 w-5" />
                    View Code
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}
