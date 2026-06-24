import React, { useState } from 'react';
import { BusinessData } from '../types';
import { storage } from '../storage';

interface ProjectsListProps {
  projects: BusinessData[];
  onSelectProject: (project: BusinessData) => void;
  onDeleteProject: (id: string) => void;
  onRefresh: () => void;
}

const ProjectsList: React.FC<ProjectsListProps> = ({
  projects,
  onSelectProject,
  onDeleteProject,
  onRefresh,
}) => {
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const confirmDelete = (id: string) => {
    if (deleteConfirm === id) {
      onDeleteProject(id);
      setDeleteConfirm(null);
      onRefresh();
    } else {
      setDeleteConfirm(id);
    }
  };

  if (projects.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg">
        <p className="text-gray-500 text-lg mb-4">No projects yet</p>
        <p className="text-gray-400 text-sm">Create your first website to get started!</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {projects.map((project) => (
        <div
          key={project.id}
          className="bg-white border border-gray-200 rounded-lg p-4 hover:border-blue-400 hover:shadow-md transition-all"
        >
          <div className="flex items-start justify-between">
            <button
              onClick={() => onSelectProject(project)}
              className="flex-1 text-left hover:opacity-70 transition-opacity"
            >
              <h3 className="font-bold text-lg text-gray-900">
                {project.businessName}
              </h3>
              <p className="text-sm text-gray-600">
                {project.businessType} • {project.city}, {project.state}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Updated {new Date(project.updatedAt).toLocaleDateString()}
              </p>
            </button>

            <button
              onClick={() => confirmDelete(project.id)}
              className={`ml-4 px-3 py-2 rounded-lg font-semibold text-sm transition-all ${
                deleteConfirm === project.id
                  ? 'bg-red-500 text-white hover:bg-red-600'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              title={deleteConfirm === project.id ? 'Click again to confirm delete' : 'Delete project'}
            >
              {deleteConfirm === project.id ? 'Confirm?' : '🗑️ Delete'}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectsList;
