"use client";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { ProjectCard } from "./ProjectCard";
import { useAdminProjects } from "@/hooks/useProjects";


const ProjectsSection = () => {
  const { projects} = useAdminProjects();
  const filteredProjects = projects?.filter((project: any) => project.isPinned) || [];
  
  return (
    <div className="m-auto relative max-w-[1010px]  mb-28 mt-12 mx-auto py-4 px-2">
      <div className="absolute top-10 left-1/3   transform -translate-x-1/2 h-[280px] w-[350px] bg-gradient-to-r from-purple-800 via-pink-800 to-orange-800 blur-3xl opacity-40 -ml-20 -z-10"></div>
      <h2 className="text-4xl font-bold mb-10 text-zinc-900 dark:text-zinc-200 text-center m-auto">
        Selected Projects
      </h2>
      <div className=" grid grid-cols-1 mb-14 px-4 sm:grid-cols-2 lg:grid-cols-2 gap-6">
        {filteredProjects.map((project: any) => (
          <ProjectCard key={project._id} project={project} />
        ))}
      </div>
      <Link href={"/user/projects"}>
        <Button
          variant="outline"
          className="group px-4 m-auto py-3 -mt-4 text-sm border-zinc-300 text-zinc-800 bg-white dark:bg-zinc-950 dark:border-gray-800 dark:text-gray-200 hover:bg-zinc-800 hover:text-gray-100 transition-all flex items-center gap-2"
        >
          See More Projects
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Button>
      </Link>
    </div>
  );
};

export default ProjectsSection;
