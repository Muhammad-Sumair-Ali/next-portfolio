"use client"
import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { projectsApi } from "@/hooks/useApi";
import toast from "react-hot-toast";

interface Project {
  _id: string;
  title: string;
  imageUrl?: string;
  tags: string[];
  demoLink?: string;
  githubLink?: string;
  isPinned: boolean;
}

export const useAdminProjects = () => {
  const [showForm, setShowForm] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const queryClient = useQueryClient();

  const { 
    data: projects = [], 
    isLoading, 
    error: queryError,
    refetch 
  } = useQuery<Project[], Error>({
    queryKey: ['adminProjects'],
    queryFn: async () => {
      try {
        const response = await projectsApi.getProjects();
        // Validate response format
        if (!Array.isArray(response)) {
          throw new Error("Invalid response format");
        }
        // Sort projects by tags length in descending order
        const sortedProjects = [...response].sort((a, b) => {
          const tagsA = a.tags || [];
          const tagsB = b.tags || [];
          return tagsB.length - tagsA.length;
        });
        return sortedProjects as Project[];
      } catch (error) {
        console.error("Project fetch error:", error);
        const errorMessage = (error as any).response?.data?.message || "Failed to load projects";
        toast.error(errorMessage);
        throw new Error(errorMessage);
      }
    },
    // Add retry configuration to handle network issues
    retry: 3,
    retryDelay: 1000,
    // Improve stale time management
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const error = queryError ? queryError.message : null;

  const fetchProjects = async () => {
    await refetch();
  };

  const handleEditProject = (project: Project) => {
    setSelectedProject(project);
    setShowForm(true);
  };

  const handleDeleteProject = async (id: string): Promise<void> => {
    if (!window.confirm("Are you sure you want to delete this project?")) {
      return;
    }

    try {
      await projectsApi.deleteProject(id);
      queryClient.setQueryData<Project[]>(['adminProjects'], 
        (oldData) => (oldData || []).filter((project) => project._id !== id)
      );
      toast.success("Project deleted successfully");
      queryClient.invalidateQueries({ queryKey: ['adminProjects'] });
    } catch (err) {
      toast.error((err as any).response?.data?.message || "Error deleting project");
    }
  };

  const handleFormClose = () => {
    setShowForm(false);
    setSelectedProject(null);
    queryClient.invalidateQueries({ queryKey: ['adminProjects'] });
  };

  const openAddProjectForm = () => {
    setShowForm(true);
    setSelectedProject(null);
  };

  return {
    projects,
    isLoading,
    error,
    showForm,
    selectedProject,
    fetchProjects,
    handleEditProject,
    handleDeleteProject,
    handleFormClose,
    openAddProjectForm,
    setShowForm
  };
};