import React from 'react';

interface LandingPageProps {
  onStartBuilding: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStartBuilding }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-600 to-blue-800 text-white flex flex-col items-center justify-center px-4">
      <div className="max-w-2xl text-center">
        <div className="text-6xl mb-4 md:text-5xl">🗺️</div>
        <h1 className="text-5xl font-bold mb-4 md:text-4xl">
          Atlas Local Business Website Generator
        </h1>
        <p className="text-2xl mb-8 text-blue-100 md:text-lg">
          Create a clean local business website in minutes
        </p>
        <p className="text-lg mb-10 text-blue-100 max-w-lg mx-auto">
          No coding required. No backend. No expensive tools. Just your business, your way.
        </p>

        <button
          onClick={onStartBuilding}
          className="bg-white text-blue-600 hover:bg-blue-50 font-bold py-4 px-12 rounded-lg text-lg transition-all transform hover:scale-105 shadow-lg mb-8"
        >
          Start Building
        </button>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="bg-blue-700 bg-opacity-50 rounded-lg p-6">
            <div className="text-4xl mb-2">⚡</div>
            <h3 className="font-bold text-lg mb-2">Lightning Fast</h3>
            <p className="text-blue-100 text-sm">
              Get your website online in minutes, not days
            </p>
          </div>
          <div className="bg-blue-700 bg-opacity-50 rounded-lg p-6">
            <div className="text-4xl mb-2">📱</div>
            <h3 className="font-bold text-lg mb-2">Mobile Ready</h3>
            <p className="text-blue-100 text-sm">
              Looks perfect on phones, tablets, and desktops
            </p>
          </div>
          <div className="bg-blue-700 bg-opacity-50 rounded-lg p-6">
            <div className="text-4xl mb-2">💰</div>
            <h3 className="font-bold text-lg mb-2">Completely Free</h3>
            <p className="text-blue-100 text-sm">
              No hidden fees, no subscriptions, ever
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
