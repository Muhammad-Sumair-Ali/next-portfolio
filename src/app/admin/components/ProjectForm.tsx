'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Save, Loader2 } from 'lucide-react';
import { useProjectForm } from '@/hooks/useProjectForm'; 

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
  const {
    formData,
    isLoading,
    formError,
    handleChange,
    handleTagToggle,
    handleImageChange,
    handleSubmit,
    setFormData,
    TECH_SKILLS
  } = useProjectForm({ project, onCancel, onSuccess });

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
              {project?._id ? "Edit Project" : "Add New Project"}
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
                required={!project?._id}
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
                {TECH_SKILLS.map(tech => (
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
                    {project?._id ? "Updating..." : "Saving..."}
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    {project?._id ? "Update Project" : "Save Project"}
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