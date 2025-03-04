import { useState, ChangeEvent, FormEvent } from 'react';
import { projectsApi } from '@/hooks/useApi';
import toast from 'react-hot-toast';
import { TECH_SKILLS_PROJECT_FORM } from '@/config/Link';

interface ProjectFormState {
  title: string;
  description: string;
  demoLink: string;
  githubLink: string;
  isPinned: boolean;
  tags: string[];
  image: File | null;
  imagePreview: string;
}

interface ProjectFormHookProps {
  project?: {
    _id?: string;
    title?: string;
    description?: string;
    demoLink?: string;
    githubLink?: string;
    isPinned?: boolean;
    tags?: string[];
    imageUrl?: string;
  };
  onCancel: () => void;
  onSuccess: () => void;
}

export const useProjectForm = ({ project = {}, onCancel, onSuccess }: ProjectFormHookProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState("");

  const [formData, setFormData] = useState<ProjectFormState>({
    title: project?.title || "",
    description: project?.description || "",
    demoLink: project?.demoLink || "",
    githubLink: project?.githubLink || "",
    isPinned: project?.isPinned || false,
    tags: project?.tags || [],
    image: null,
    imagePreview: project?.imageUrl || "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleTagToggle = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag]
    }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        image: file,
        imagePreview: URL.createObjectURL(file)
      }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setFormError("");

    try {
      // Validate form data
      if (!formData.title.trim()) {
        throw new Error("Project title is required");
      }
      if (!formData.description.trim()) {
        throw new Error("Project description is required");
      }
      if (!project?._id && !formData.image) {
        throw new Error("Project image is required for new projects");
      }

      const submitData = new FormData();
      submitData.append("title", formData.title);
      submitData.append("description", formData.description);
      submitData.append("demoLink", formData.demoLink);
      submitData.append("githubLink", formData.githubLink);
      submitData.append("isPinned", formData.isPinned.toString());
      submitData.append("tags", formData.tags.join(","));

      if (formData.image) {
        submitData.append("image", formData.image);
      }

      let result;
      if (project?._id) {
        result = await projectsApi.updateProject(project._id, submitData);
        toast.success("Project updated successfully");
      } else {
        result = await projectsApi.createProject(submitData);
        toast.success("Project created successfully");
      }

      onSuccess?.();
    } catch (error) {
      const errorMessage = 
        (error as any)?.response?.data?.error || 
        (error as Error)?.message || 
        "Failed to save project";
      
      toast.error(errorMessage);
      setFormError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      demoLink: "",
      githubLink: "",
      isPinned: false,
      tags: [],
      image: null,
      imagePreview: "",
    });
    setFormError("");
  };

  return {
    formData,
    isLoading,
    formError,
    handleChange,
    handleTagToggle,
    handleImageChange,
    handleSubmit,
    setFormData,
    resetForm,
    TECH_SKILLS: TECH_SKILLS_PROJECT_FORM
  };
};