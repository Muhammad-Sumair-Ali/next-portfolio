'use client'
import React, { useState } from "react";
import { ProjectCard } from "@/components/ProjectCard";
import Heading from "@/components/reuseable/Heading";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { X, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
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
const Projects = () => {
  // Get unique tags from all projects
  const allTags = [...new Set(projects.flatMap((project) => project.tags))];
  
  // States for filters
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Filter projects based on selected tag and search query
  const filteredProjects = projects.filter((project) => {
    const matchesTag = !selectedTag || project.tags.includes(selectedTag);
    const matchesSearch = 
      searchQuery === "" ||
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesTag && matchesSearch;
  });

  return (
    <div>
      <Heading
        title="Projects"
        description="We All Here My Din Raat Ko BAnaye Howee Projects"
      />
      
      <div className="m-auto relative max-w-[1010px] mb-12 mt-4 mx-auto py-4 px-2">
        {/* Gradient background */}
        <div className="absolute top-20 right-20 transform -translate-x-1/2 h-[230px] w-[650px] bg-gradient-to-r from-purple-800 via-pink-800 to-orange-800 blur-3xl opacity-25 -ml-20 -z-10"></div>
        <div className="absolute bottom-1 -right-44 transform -translate-x-1/2 h-[230px] w-[650px] bg-gradient-to-r from-purple-800 via-pink-800 to-orange-800 blur-3xl opacity-20 -ml-20 -z-10"></div>
        
        {/* Filter section */}
        <div className="mb-6 px-4 flex flex-wrap items-center gap-4">
          {/* Search Input */}
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8"
            />
          </div>
          
          {/* Tag Filter */}
          <Select 
            value={selectedTag || "all"} 
            onValueChange={(value) => setSelectedTag(value === "all" ? null : value)}
          >
            <SelectTrigger className="w-[200px] dark:text-zinc-200 text-black">
              <SelectValue placeholder="Filter by technology" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Projects</SelectItem>
              {allTags.map((tag) => (
                <SelectItem key={tag} value={tag}>
                  {tag}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          {/* Active Filter Badge */}
          {selectedTag && (
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="px-3 py-1">
                {selectedTag}
                <button
                  onClick={() => setSelectedTag(null)}
                  className="ml-2 hover:text-primary"
                >
                  <X size={14} />
                </button>
              </Badge>
            </div>
          )}
        </div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 mb-14 px-4 sm:grid-cols-2 lg:grid-cols-2 gap-12">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project, index) => (
              <ProjectCard key={index} project={project} />
            ))
          ) : (
            <div className="col-span-2 text-center py-8 text-muted-foreground">
              No projects found matching your criteria
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Projects;