"use client"
import { useState, useEffect } from "react";
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
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const fetchProjects = async () => {
    setIsLoading(true);
    try {
      const response = await projectsApi.getProjects();
      const fetchedProjects = response as Project[];
      setProjects(fetchedProjects);
      setError(null);
    } catch (error) {
      toast.error((error as any).response?.data?.message || "Fetch projects failed");
      setError("Failed to load projects. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

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
      setProjects(projects.filter((project) => project._id !== id));
      toast.success("Project deleted successfully");
    } catch (err) {
      toast.error((err as any).response?.data?.message || "Error deleting project");
    }
  };

  const handleFormClose = () => {
    setShowForm(false);
    setSelectedProject(null);
    fetchProjects(); 
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