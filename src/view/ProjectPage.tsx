"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import { Calendar, Edit3, ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Project } from "@/hooks/useApi";
import Heading from "@/components/reuseable/Heading";
import techStacks from "@/data/tech";
import { TechRowProject } from "@/components/reuseable/skills";
import { motion } from "framer-motion";

const Projectpage = ({ project }: { project: Project }) => {
  const [isHovered, setIsHovered] = useState<number | null>(null);

  const filteredProjectStacksData = techStacks.filter((stack) =>
    project.tags.some((tag) => tag.toLowerCase() === stack.title.toLowerCase())
  );

  const createdAt = project?.createdAt
    ? new Date(project.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "2-digit",
      })
    : "N/A";

  return (
    <>
      <Heading title={project.title} description={project.description} />

      <div className="m-auto bg-gradient-to-b from-zinc-50 via-white to-zinc-50/50 dark:from-slate-950/20 dark:via-black dark:to-transparent -mt-3">
        <div className="relative min-h-screen max-w-6xl mx-auto mb-12 mt-4 py-6 px-4 lg:px-8">
          {/* Hero Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Project Preview */}
            <motion.div
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 120 }}
              className="w-full"
            >
              <Card className="overflow-hidden shadow-xl rounded-2xl backdrop-blur-sm bg-white/70 dark:bg-zinc-900/40 border border-zinc-200/40 dark:border-zinc-800/40">
                <CardContent className="p-0">
                  <div className="relative h-72 sm:h-96">
                    <Image
                      width={600}
                      height={400}
                      unoptimized
                      priority
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-full h-full object-cover rounded-2xl"
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Project Info */}
            <div className="flex flex-col justify-center space-y-6">
              <div className="space-y-3">
                <h3 className="text-2xl sm:text-4xl tracking-tight text-zinc-900 dark:text-zinc-100">
                  {project.title}
                </h3>
                <p className="text-base sm:text-lg text-muted-foreground">
                  Technologies used in this project
                </p>

                <div className="flex flex-wrap gap-2">
                  {project?.tags?.map((tag: any, index: number) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="bg-gradient-to-r from-zinc-600/20 to-blue-950/10 border border-zinc-200 dark:border-zinc-700 rounded-full px-4 py-1 text-sm font-medium text-zinc-800 dark:text-zinc-300 hover:scale-105 transition"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Date */}
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <p>Added on {createdAt}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                <Link href={project.demoLink || "#"} target="_blank">
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-zinc-900 to-zinc-800 text-white hover:from-zinc-700 hover:to-zinc-500"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Visit Website
                  </Button>
                </Link>
                <Link href={project.githubLink || "#"} target="_blank">
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-zinc-900 to-zinc-800 text-white hover:from-zinc-700 hover:to-zinc-500"
                  >
                    <Edit3 className="h-4 w-4 mr-2" />
                    Get Code
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Skills Section */}
          <div className="mt-16">
            <h2 className="text-xl sm:text-2xl font-semibold text-zinc-800 dark:text-zinc-200 mb-6">
              Popular Skills Used in this Project
            </h2>
            <TechRowProject
              className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 md:gap-6"
              items={filteredProjectStacksData}
              isHovered={isHovered}
              setIsHovered={setIsHovered}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Projectpage;
