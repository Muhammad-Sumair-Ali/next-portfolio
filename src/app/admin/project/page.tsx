"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pencil,
  Trash2,
  Plus,
  Star,
  StarOff,
  ExternalLink,
  Github,
} from "lucide-react";
import ProjectForm from "../components/ProjectForm";
import { useAdminProjects } from "@/hooks/useProjects"; 

export default function AdminProjects() {
  const {
    projects,
    isLoading,
    error,
    showForm,
    selectedProject,
    handleEditProject,
    handleDeleteProject,
    handleFormClose,
    openAddProjectForm
  } = useAdminProjects();

  if (showForm) {
    return (
      <ProjectForm
        project={selectedProject || undefined}
        onCancel={handleFormClose}
        onSuccess={handleFormClose}
      />
    );
  }

  return (
    <div className="container mx-auto py-8 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Manage Projects</h1>
        <Button onClick={openAddProjectForm}>
          <Plus className="mr-2 h-4 w-4" /> Add New Project
        </Button>
      </div>

      {error && (
        <Card className="bg-red-50">
          <CardContent className="pt-6 text-red-600">{error}</CardContent>
        </Card>
      )}

      {isLoading ? (
        <div className="text-center py-12">Loading projects...</div>
      ) : projects.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground mb-4">No projects found</p>
            <Button onClick={openAddProjectForm}>
              Add Your First Project
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="p-0 overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">Featured</TableHead>
                  <TableHead>Image</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Technologies</TableHead>
                  <TableHead>Links</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {projects.map((project) => (
                  <TableRow key={project._id} className="mb-4">
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon"
                        title={
                          project.isPinned ? "Unpin project" : "Pin project"
                        }
                      >
                        {project.isPinned ? (
                          <Star className="h-5 w-5 text-yellow-500" />
                        ) : (
                          <StarOff className="h-5 w-5 text-gray-300" />
                        )}
                      </Button>
                    </TableCell>
                    <TableCell>
                      {project.imageUrl && (
                        <img
                          src={project.imageUrl}
                          alt={project.title}
                          className="w-28 h-20 object-cover rounded"
                        />
                      )}
                    </TableCell>
                    <TableCell className="font-medium">
                      {project.title}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1 max-w-[250px]">
                        {project.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="secondary">
                            {tag}
                          </Badge>
                        ))}
                        {project.tags.length > 3 && (
                          <Badge variant="outline">
                            +{project.tags.length - 3}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        {project.demoLink && (
                          <a
                            href={project.demoLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:text-blue-700"
                          >
                            <ExternalLink className="h-5 w-5" />
                          </a>
                        )}
                        {project.githubLink && (
                          <a
                            href={project.githubLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-700 hover:text-black"
                          >
                            <Github className="h-5 w-5" />
                          </a>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEditProject(project)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          onClick={() => handleDeleteProject(project._id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}