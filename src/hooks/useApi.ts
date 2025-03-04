'use client';
import axios, { AxiosResponse } from 'axios';
import toast from 'react-hot-toast';

// Create an axios instance with base configuration
const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add an interceptor to include the token in every request
const token = localStorage.getItem("adminToken");
if (token) {
  api.interceptors.request.use(
    (config) => {
      config.headers['Authorization'] = `Bearer ${token}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
}

interface Project {
  _id?: string;
  title?: string;
  description?: string;
  demoLink?: string;
  githubLink?: string;
  isPinned?: boolean;
  tags?: string[];
  imageUrl?: string;
}

export const projectsApi = {
  // Get all projects
  getProjects: async (params: Record<string, any> = {}): Promise<Project[]> => {
    try {
      const response: AxiosResponse<Project[]> = await api.get('/project/get', { params });
      return response.data;
    } catch (error) {
      toast.error((error as any).response?.data?.message || "Error getting projects");
      throw error;
    }
  },

  // Get a single project by ID
  getProject: async (id: string): Promise<Project> => {
    try {
      const response: AxiosResponse<Project> = await api.get(`/project/update/${id}`);
      return response.data;
    } catch (error) {
      toast.error((error as any).response?.data?.message || "Error getting single project");
      throw error;
    }
  },

  // Create a new project
  createProject: async (formData: FormData): Promise<Project> => {
    try {
      const response: AxiosResponse<Project> = await api.post('/project/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success("Project created successfully");
      return response.data;
    } catch (error) {
      toast.error((error as any).response?.data?.message || "Error creating project");
      throw error;
    }
  },

  // Update an existing project
  updateProject: async (id: string, formData: FormData): Promise<Project> => {
    try {
      const response: AxiosResponse<Project> = await api.put(`/project/edit/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success("Project updated successfully");
      return response.data;
    } catch (error) {
      toast.error(`Error updating project ${id}:`, (error as any).response?.data?.message || "Error updating project");
      throw error;
    }
  },

  // Delete a project
  deleteProject: async (id: string): Promise<{ message: string }> => {
    try {
      const response: AxiosResponse<{ message: string }> = await api.delete(`/project/edit/${id}`);
      toast.success("Project deleted successfully");
      return response.data;
    } catch (error) {
      toast.error(`Error deleting project ${id}:`, (error as any).response?.data?.message);
      throw error;
    }
  },
};

export default api;