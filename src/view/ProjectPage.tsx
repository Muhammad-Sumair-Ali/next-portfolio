"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import { Calendar, Edit3, ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
// import { Separator } from "@/components/ui/separator";
import { Project } from "@/hooks/useApi";
import Heading from "@/components/reuseable/Heading";
import techStacks from "@/data/tech";
import { TechRow } from "@/components/reuseable/skills";

const Projectpage = ({ project }: { project: Project }) => {
  if (!project) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-xl sm:text-2xl font-bold text-foreground mb-3">
            Product Not Found
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground mb-5">
            The product you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link href="/all-tools">
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white text-sm sm:text-base">
              Browse All Tools
            </Button>
          </Link>
        </div>
      </div>
    );
  }
  
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

      <div
        className="m-auto bg-gradient-to-br from-indigo-100 via-white to-emerald-400/25
      dark:from-purple-950/5 dark:via-black dark:to-fuchsia-950/20"
      >
        <div className="m-auto relative min-h-screen max-w-[1020px] mb-12 mt-4  mx-auto py-4 px-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {/* Hero Section */}
            <div className="lg:col-span-3 space-y-6 sm:space-y-8">
              <div className="flex flex-col sm:flex-row sm:flex-nowrap gap-6 sm:gap-8 py-4 sm:py-6">
                {/* Tool Preview */}
                <Card className="overflow-hidden w-full sm:w-2/4 h-auto">
                  <CardContent className="p-0">
                    <div className="relative h-64 sm:h-72 bg-gradient-to-br from-slate-900 to-slate-800 rounded-lg overflow-hidden">
                      <Image
                        width={200}
                        height={200}
                        unoptimized
                        priority
                        src={project.imageUrl}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Tool Information */}
                <div className="space-y-4 sm:space-y-6 w-full sm:w-2/4">
                  <div className="space-y-3 sm:space-y-4">
                    <h1 className="text-2xl sm:text-4xl font-semibold text-zinc-900 dark:text-zinc-200">
                      {project.title}
                    </h1>
                    <p className="text-sm sm:text-lg text-muted-foreground leading-relaxed">
                      Tech Stacks use in
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {project?.tags?.map((tag: any, index: number) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="inline-flex items-center space-x-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-1 text-xs font-medium text-emerald-600 dark:text-emerald-400"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    {/*  Date */}
                    <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm">
                      <div className="flex items-center gap-1.5 sm:gap-2 text-muted-foreground">
                        <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
                        <p>Added: {createdAt}</p>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    <Link href={project.demoLink || "#"} target="_blank">
                      <Button className="bg-emerald-700 hover:bg-emerald-800 text-white text-xs sm:text-sm">
                        <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                        Visit Website
                      </Button>
                    </Link>
                    <Link href={project.githubLink || "#"} target="_blank">
                      <Button
                        className="hover:text-zinc-100 text-xs dark:text-zinc-100 text-zinc-800 sm:text-sm dark:hover:bg-emerald-700"
                        variant="outline"
                      >
                        <Edit3 className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                        Get code
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Sections */}
          <div className="flex flex-col sm:flex-row mt-4">
            <div className="sm:basis-3/4 sm:px-4">
              {/* Section links */}
              <div className="pt-6 sm:pt-12 ">
                <div className="flex justify-evenly gap-3 font-semibold sm:gap-6 px-2 sm:px-4 py-2 sm:py-3 text-lg sm:text-lg lg:text-xl">
                  {/* {sectionLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-zinc-800 hover:text-emerald-600 dark:text-emerald-500 dark:hover:text-emerald-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                ))} */}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-4 md:grid-cols-5">
            <TechRow items={filteredProjectStacksData} isHovered={isHovered} setIsHovered={setIsHovered} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Projectpage;
