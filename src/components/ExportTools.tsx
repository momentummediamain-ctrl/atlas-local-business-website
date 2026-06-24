import React from 'react';
import { BusinessData } from '../types';
import { exportWebsite } from '../utils';

interface ExportToolsProps {
  business: BusinessData | null;
  onShowToast: (message: string, type: 'success' | 'error' | 'info') => void;
}

const ExportTools: React.FC<ExportToolsProps> = ({ business, onShowToast }) => {
  if (!business) {
    return null;
  }

  const handleCopyText = () => {
    const textContent = generateTextContent();
    navigator.clipboard.writeText(textContent);
    onShowToast('Website text copied to clipboard!', 'success');
  };

  const handleDownloadTxt = () => {
    const textContent = generateTextContent();
    const element = document.createElement('a');
    element.setAttribute(
      'href',
      'data:text/plain;charset=utf-8,' + encodeURIComponent(textContent)
    );
    element.setAttribute(
      'download',
      `${business.businessName.replace(/\s+/g, '-').toLowerCase()}.txt`
    );
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    onShowToast('Website text downloaded!', 'success');
  };

  const handleDownloadHTML = () => {
    const htmlContent = exportWebsite(business, 'html');
    const element = document.createElement('a');
    element.setAttribute(
      'href',
      'data:text/html;charset=utf-8,' + encodeURIComponent(htmlContent)
    );
    element.setAttribute(
      'download',
      `${business.businessName.replace(/\s+/g, '-').toLowerCase()}.html`
    );
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    onShowToast('Website HTML downloaded!', 'success');
  };

  const handlePrint = () => {
    const printWindow = window.open('', '', 'height=600,width=800');
    if (printWindow) {
      const htmlContent = exportWebsite(business, 'html');
      printWindow.document.write(htmlContent);
      printWindow.document.close();
      setTimeout(() => {
        printWindow.print();
      }, 250);
    }
  };

  const generateTextContent = () => {
    return exportWebsite(business, 'txt') || '';
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      <h3 className="font-bold text-lg mb-4 text-gray-900">📤 Export Tools</h3>
      <div className="grid grid-cols-1 gap-2">
        <button
          onClick={handleCopyText}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
        >
          📋 Copy Website Text
        </button>
        <button
          onClick={handleDownloadHTML}
          className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
        >
          💾 Download as HTML
        </button>
        <button
          onClick={handleDownloadTxt}
          className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
        >
          📄 Download as Text
        </button>
        <button
          onClick={handlePrint}
          className="w-full bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
        >
          🖨️ Print Preview
        </button>
      </div>
    </div>
  );
};

export default ExportTools;
