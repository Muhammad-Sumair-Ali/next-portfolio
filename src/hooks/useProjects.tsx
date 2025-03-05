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
        return response as Project[];
      } catch (error) {
        toast.error((error as any).response?.data?.message || "Fetch projects failed");
        throw new Error("Failed to load projects. Please try again.");
      }
    }
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