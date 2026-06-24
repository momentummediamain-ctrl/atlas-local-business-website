import React, { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import BusinessForm from './components/BusinessForm';
import WebsitePreview from './components/WebsitePreview';
import ProjectsList from './components/ProjectsList';
import ExportTools from './components/ExportTools';
import { BusinessData, SAMPLE_BUSINESS } from './types';
import { storage } from './storage';
import './App.css';

type AppView = 'landing' | 'builder' | 'projects';

function App() {
  const [currentView, setCurrentView] = useState<AppView>('landing');
  const [currentProject, setCurrentProject] = useState<BusinessData | null>(null);
  const [projects, setProjects] = useState<BusinessData[]>([]);
  const [formData, setFormData] = useState<Partial<BusinessData>>({});
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = () => {
    const allProjects = storage.getAllProjects();
    setProjects(allProjects);
  };

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleStartBuilding = () => {
    // Load sample project to start with
    setCurrentProject(SAMPLE_BUSINESS);
    setFormData(SAMPLE_BUSINESS);
    setCurrentView('builder');
  };

  const handleNewProject = () => {
    setCurrentProject(null);
    setFormData({});
    setCurrentView('builder');
  };

  const handleSelectProject = (project: BusinessData) => {
    setCurrentProject(project);
    setFormData(project);
    setCurrentView('builder');
  };

  const handleSaveProject = (data: BusinessData) => {
    storage.saveProject(data);
    setCurrentProject(data);
    setFormData(data);
    loadProjects();
    showToast('Project saved successfully!', 'success');
  };

  const handleDeleteProject = (id: string) => {
    storage.deleteProject(id);
    loadProjects();
    if (currentProject?.id === id) {
      setCurrentProject(null);
      setFormData({});
      setCurrentView('projects');
    }
    showToast('Project deleted', 'info');
  };

  const handleFormChange = (data: Partial<BusinessData>) => {
    setFormData(data);
    // Create a temporary preview object
    const previewData = {
      ...currentProject,
      ...data,
      id: currentProject?.id || Date.now().toString(),
      createdAt: currentProject?.createdAt || Date.now(),
      updatedAt: Date.now(),
    } as BusinessData;
    setCurrentProject(previewData);
  };

  // Mobile view with bottom navigation
  if (isMobile) {
    return (
      <div className="h-screen bg-gray-100 flex flex-col">
        {currentView === 'landing' && (
          <LandingPage onStartBuilding={handleStartBuilding} />
        )}

        {currentView === 'projects' && (
          <div className="flex-1 overflow-y-auto p-4 pb-20">
            <div className="mb-4">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">My Projects</h1>
              <button
                onClick={handleNewProject}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg transition-colors"
              >
                + New Project
              </button>
            </div>
            <ProjectsList
              projects={projects}
              onSelectProject={handleSelectProject}
              onDeleteProject={handleDeleteProject}
              onRefresh={loadProjects}
            />
          </div>
        )}

        {currentView === 'builder' && (
          <div className="flex-1 overflow-y-auto pb-20">
            <div className="p-4">
              <BusinessForm
                initialData={currentProject}
                onSave={handleSaveProject}
                onChange={handleFormChange}
              />
            </div>
          </div>
        )}

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around p-2">
          <button
            onClick={() => setCurrentView('landing')}
            className={`flex-1 py-2 px-3 text-sm font-semibold rounded-lg transition-colors ${
              currentView === 'landing'
                ? 'bg-blue-500 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            🏠 Home
          </button>
          <button
            onClick={() => setCurrentView('builder')}
            className={`flex-1 py-2 px-3 text-sm font-semibold rounded-lg transition-colors ${
              currentView === 'builder'
                ? 'bg-blue-500 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            ✏️ Builder
          </button>
          <button
            onClick={() => setCurrentView('projects')}
            className={`flex-1 py-2 px-3 text-sm font-semibold rounded-lg transition-colors ${
              currentView === 'projects'
                ? 'bg-blue-500 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            📁 Projects ({projects.length})
          </button>
        </div>

        {/* Toast */}
        {toast && (
          <div className="fixed top-4 left-4 right-4 z-50">
            <div
              className={`px-4 py-3 rounded-lg text-white font-semibold text-center ${
                toast.type === 'success'
                  ? 'bg-green-500'
                  : toast.type === 'error'
                  ? 'bg-red-500'
                  : 'bg-blue-500'
              }`}
            >
              {toast.message}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Desktop view with sidebar
  return (
    <div className="h-screen flex bg-gray-100">
      {/* Sidebar Navigation */}
      <div className="w-64 bg-white border-r border-gray-200 shadow-lg overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-blue-600">🗺️ Atlas</h1>
          <p className="text-xs text-gray-600 mt-1">Website Generator</p>
        </div>

        <nav className="p-4 space-y-2">
          <button
            onClick={() => setCurrentView('landing')}
            className={`w-full text-left py-3 px-4 rounded-lg font-semibold transition-colors ${
              currentView === 'landing'
                ? 'bg-blue-100 text-blue-700 border-l-4 border-blue-600'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            🏠 Home
          </button>
          <button
            onClick={handleNewProject}
            className="w-full text-left py-3 px-4 rounded-lg font-semibold text-gray-700 hover:bg-gray-100 transition-colors"
          >
            ✨ New Project
          </button>
          <button
            onClick={() => setCurrentView('projects')}
            className={`w-full text-left py-3 px-4 rounded-lg font-semibold transition-colors ${
              currentView === 'projects'
                ? 'bg-blue-100 text-blue-700 border-l-4 border-blue-600'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            📁 My Projects ({projects.length})
          </button>
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {currentView === 'landing' && <LandingPage onStartBuilding={handleStartBuilding} />}

        {currentView === 'projects' && (
          <div className="flex-1 overflow-y-auto p-8">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl font-bold text-gray-900 mb-6">My Projects</h1>
              <ProjectsList
                projects={projects}
                onSelectProject={handleSelectProject}
                onDeleteProject={handleDeleteProject}
                onRefresh={loadProjects}
              />
            </div>
          </div>
        )}

        {currentView === 'builder' && (
          <div className="flex-1 flex overflow-hidden">
            {/* Form Panel */}
            <div className="w-80 bg-white border-r border-gray-200 overflow-y-auto shadow-sm">
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Website Builder</h2>
                <BusinessForm
                  initialData={currentProject}
                  onSave={handleSaveProject}
                  onChange={handleFormChange}
                />
              </div>
            </div>

            {/* Preview Panel */}
            <div className="flex-1 flex flex-col bg-gray-50 overflow-hidden">
              <div className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900">Live Preview</h3>
              </div>
              <div className="flex-1 overflow-hidden">
                <WebsitePreview business={currentProject || null} />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Export Tools Panel - Only show in builder view */}
      {currentView === 'builder' && currentProject && (
        <div className="w-72 bg-white border-l border-gray-200 overflow-y-auto shadow-lg">
          <div className="p-6">
            <ExportTools business={currentProject} onShowToast={showToast} />
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-6 right-6 z-50 max-w-md">
          <div
            className={`px-6 py-4 rounded-lg text-white font-semibold shadow-lg ${
              toast.type === 'success'
                ? 'bg-green-500'
                : toast.type === 'error'
                ? 'bg-red-500'
                : 'bg-blue-500'
            }`}
          >
            {toast.message}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
