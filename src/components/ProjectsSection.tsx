"use client";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { ProjectCard } from "./ProjectCard";

const ProjectsSection = () => {
  const projects = [
    {
      title: "Blog",
      description: "Share my knowledge and experience",
      longDescription:
        "A full-stack blog platform built with Next.js, featuring a custom CMS, markdown support, and dynamic routing. Implements modern web development practices including SSR, ISR, and optimized image loading.",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-05%20030222-46qsE9kc8n7m1drlWhfpRXkoxkf3YQ.png",
      liveUrl: "https://example.com/blog",
      githubUrl: "https://github.com/username/blog",
      tags: ["TypeScript", "PostgreSQL", "Next.js", "Drizzle", "MDX"],
    },
    {
      title: "Friend quiz cheat tool",
      description: "Get full score in friend quiz",
      longDescription:
        "An interactive quiz application that helps users achieve perfect scores. Built with TypeScript and Next.js, featuring real-time scoring, progress tracking, and responsive design.",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-05%20030222-46qsE9kc8n7m1drlWhfpRXkoxkf3YQ.png",
      liveUrl: "https://example.com/quiz",
      githubUrl: "https://github.com/username/quiz",
      tags: ["TypeScript", "Next.js"],
    },
  ];
  return (
    <div className="m-auto relative max-w-[1010px]  mb-28 mt-12 mx-auto py-4 px-2">
      <div className="absolute top-10 left-64 transform -translate-x-1/2 h-[280px] w-[350px] bg-gradient-to-r from-purple-800 via-pink-800 to-orange-800 blur-3xl opacity-40 -ml-20 -z-10"></div>
      <h2 className="text-4xl font-bold mb-10  text-center m-auto">
        Selected Projects
      </h2>
      <div className=" grid grid-cols-1 mb-14 px-4 sm:grid-cols-2 lg:grid-cols-2 gap-6">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>
      <Link href={"/projects"}>
        <Button
          variant="outline"
          className="group px-4 m-auto py-3 -mt-4 text-sm bg-zinc-950 border-gray-800 text-gray-200 hover:bg-zinc-800 hover:text-gray-100 transition-all flex items-center gap-2"
        >
          See More Projects
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Button>
      </Link>
    </div>
  );
};

export default ProjectsSection;
