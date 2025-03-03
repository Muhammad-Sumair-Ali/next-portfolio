'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
 
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Save, Loader2 } from 'lucide-react';
import { projectsApi } from '@/hooks/useApi';
import toast from 'react-hot-toast';
import { TECH_SKILLS_PROJECT_FORM } from '@/config/Link';


interface ProjectFormProps {
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

export default function ProjectForm({ project = {}, onCancel, onSuccess }: ProjectFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState("");

  const [formData, setFormData] = useState({
    title: project?.title || "",
    description: project?.description || "",
    demoLink: project?.demoLink || "",
    githubLink: project?.githubLink || "",
    isPinned: project?.isPinned || false,
    tags: project?.tags || [],
    image: null as File | null,
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
      } else {
        result = await projectsApi.createProject(submitData);
      }

      onSuccess?.();

    } catch (error) {
      toast.error(`Error submitting project: ${(error as any)?.response?.data?.error || (error as Error)?.message}`);
      setFormError(
        (error as any)?.response?.data?.error || 
        (error as Error)?.message || 
        "Failed to save project"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8 max-w-2xl">
      <Button 
        variant="ghost" 
        onClick={onCancel} 
        className="mb-4"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Projects
      </Button>
      
      <Card>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <h1 className="text-2xl font-bold pb-2 border-b">
              {project ? "Edit Project" : "Add New Project"}
            </h1>
            
            {formError && (
              <div className="bg-red-50 text-red-500 p-3 rounded-md">
                {formError}
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="title">Project Title</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Project Title"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Project Description"
                required
                rows={5}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="image">Project Image</Label>
              <Input
                id="image"
                name="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="cursor-pointer"
                required={!project}
              />
              
              {formData.imagePreview && (
                <div className="mt-2">
                  <img 
                    src={formData.imagePreview} 
                    alt="Preview" 
                    className="w-full max-h-60 object-cover rounded-md" 
                  />
                </div>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="demoLink">Demo Link (Optional)</Label>
              <Input
                id="demoLink"
                name="demoLink"
                value={formData.demoLink}
                onChange={handleChange}
                placeholder="https://example.com"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="githubLink">GitHub Link (Optional)</Label>
              <Input
                id="githubLink"
                name="githubLink"
                value={formData.githubLink}
                onChange={handleChange}
                placeholder="https://github.com/username/repo"
              />
            </div>
            
            <div className="space-y-2">
              <Label>Technologies Used</Label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {TECH_SKILLS_PROJECT_FORM.map(tech => (
                  <div key={tech} className="flex items-center space-x-2">
                    <Checkbox
                      id={`tech-${tech}`}
                      checked={formData.tags.includes(tech)}
                      onCheckedChange={() => handleTagToggle(tech)}
                    />
                    <Label htmlFor={`tech-${tech}`} className="cursor-pointer">
                      {tech}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox
                id="isPinned"
                checked={formData.isPinned}
                onCheckedChange={(checked) => 
                  setFormData(prev => ({ ...prev, isPinned: checked === true }))
                }
              />
              <Label htmlFor="isPinned" className="cursor-pointer">
                Pin this project (featured)
              </Label>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Button 
                type="button" 
                variant="outline" 
                onClick={onCancel}
                className="sm:flex-1"
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={isLoading} 
                className="sm:flex-1"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {project ? "Updating..." : "Saving..."}
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    {project ? "Update Project" : "Save Project"}
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}