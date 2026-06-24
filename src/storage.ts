import { BusinessData } from './types';

const STORAGE_KEY = 'atlas-projects';

export const storage = {
  getAllProjects: (): BusinessData[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Failed to load projects:', error);
      return [];
    }
  },

  saveProject: (project: BusinessData): void => {
    try {
      const projects = storage.getAllProjects();
      const existingIndex = projects.findIndex(p => p.id === project.id);
      
      const updatedProject = {
        ...project,
        updatedAt: Date.now(),
      };

      if (existingIndex >= 0) {
        projects[existingIndex] = updatedProject;
      } else {
        projects.push(updatedProject);
      }

      localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
    } catch (error) {
      console.error('Failed to save project:', error);
    }
  },

  getProject: (id: string): BusinessData | null => {
    try {
      const projects = storage.getAllProjects();
      return projects.find(p => p.id === id) || null;
    } catch (error) {
      console.error('Failed to get project:', error);
      return null;
    }
  },

  deleteProject: (id: string): void => {
    try {
      const projects = storage.getAllProjects();
      const filtered = projects.filter(p => p.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    } catch (error) {
      console.error('Failed to delete project:', error);
    }
  },

  deleteAllProjects: (): void => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Failed to delete all projects:', error);
    }
  },
};
