import React, { useState, useEffect } from 'react';
import { BusinessData, TEMPLATE_STYLES } from '../types';

interface WebsitePreviewProps {
  business: BusinessData | null;
}

const WebsitePreview: React.FC<WebsitePreviewProps> = ({ business }) => {
  if (!business) {
    return (
      <div className="flex items-center justify-center h-full bg-gray-100">
        <p className="text-gray-500 text-lg">Create or select a project to see preview</p>
      </div>
    );
  }

  const template = TEMPLATE_STYLES[business.templateStyle];
  const accentColor = template.accentColor;
  const primaryColor = template.primaryColor;
  const fontFamily = template.fontFamily === 'serif' ? 'font-serif' : 'font-sans';
  const borderRadius = template.borderRadius;

  const scrollToContact = () => {
    const contactSection = document.getElementById('preview-contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-white overflow-y-auto h-full">
      {/* Header */}
      <header
        className="sticky top-0 z-50 shadow-md"
        style={{ backgroundColor: primaryColor }}
      >
        <div className="max-w-6xl mx-auto px-4 py-4">
          <nav className="flex justify-between items-center text-white">
            <h1 className="text-2xl font-bold">{business.businessName}</h1>
            <div className="flex gap-4 text-sm flex-wrap justify-end">
              <a href={`tel:${business.phoneNumber}`} className="hover:opacity-80">
                {business.phoneNumber}
              </a>
              <a href={`mailto:${business.email}`} className="hover:opacity-80">
                {business.email}
              </a>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section
        className="text-white py-20 px-4 text-center"
        style={{
          background: `linear-gradient(135deg, ${primaryColor} 0%, ${accentColor} 100%)`,
        }}
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl font-bold mb-6 md:text-3xl">
            {business.websiteHeadline}
          </h2>
          <p className="text-xl mb-8 md:text-base">{business.shortDescription}</p>
          <button
            onClick={scrollToContact}
            className="px-10 py-3 font-bold text-white rounded-lg transition-all hover:scale-105 hover:shadow-lg"
            style={{ backgroundColor: accentColor }}
          >
            {business.ctaButtonText}
          </button>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-8 text-center md:text-2xl" style={{ color: primaryColor }}>
            About Us
          </h2>
          <p className="text-lg leading-relaxed">{business.shortDescription}</p>
        </div>
      </section>

      {/* Services Section */}
      {business.servicesOffered.length > 0 && (
        <section className="py-16 px-4 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center md:text-2xl" style={{ color: primaryColor }}>
              Our Services
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {business.servicesOffered.map((service, idx) => (
                <div
                  key={idx}
                  className={`p-6 text-center transition-all hover:shadow-lg hover:-translate-y-2 ${borderRadius}`}
                  style={{
                    border: `2px solid ${accentColor}`,
                    backgroundColor: 'white',
                  }}
                >
                  <h3 className="text-xl font-bold mb-3" style={{ color: accentColor }}>
                    {service}
                  </h3>
                  <p className="text-gray-600">
                    Premium quality {service.toLowerCase()} tailored to your needs.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Hours Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center md:text-2xl" style={{ color: primaryColor }}>
            Business Hours
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(business.businessHours).map(([day, hours]) => (
              <div
                key={day}
                className="p-4 bg-white rounded-lg"
                style={{
                  borderLeft: `4px solid ${accentColor}`,
                }}
              >
                <strong style={{ color: primaryColor }}>
                  {day.charAt(0).toUpperCase() + day.slice(1)}
                </strong>
                <p className="text-sm text-gray-600 mt-1">{hours}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-4 bg-white" id="preview-contact">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center md:text-2xl" style={{ color: primaryColor }}>
            Contact Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-bold mb-6" style={{ color: primaryColor }}>
                Get in Touch
              </h3>
              <p className="mb-4">
                <a
                  href={`tel:${business.phoneNumber}`}
                  className="font-bold hover:underline"
                  style={{ color: accentColor }}
                >
                  📞 {business.phoneNumber}
                </a>
              </p>
              <p className="mb-4">
                <a
                  href={`mailto:${business.email}`}
                  className="font-bold hover:underline"
                  style={{ color: accentColor }}
                >
                  ✉️ {business.email}
                </a>
              </p>
              <p className="text-gray-700">📍 {business.address}</p>
            </div>

            <div className="p-6 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-bold mb-6" style={{ color: primaryColor }}>
                Follow Us
              </h3>
              <div className="flex gap-4 justify-center">
                {business.facebookUrl && (
                  <a
                    href={business.facebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 flex items-center justify-center text-white text-xl font-bold rounded-full transition-all hover:scale-110"
                    style={{ backgroundColor: accentColor }}
                    title="Facebook"
                  >
                    f
                  </a>
                )}
                {business.instagramUrl && (
                  <a
                    href={business.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 flex items-center justify-center text-white text-xl font-bold rounded-full transition-all hover:scale-110"
                    style={{ backgroundColor: accentColor }}
                    title="Instagram"
                  >
                    📷
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* CTA Box */}
          <div
            className="mt-12 p-8 text-white text-center rounded-lg"
            style={{
              background: `linear-gradient(135deg, ${primaryColor} 0%, ${accentColor} 100%)`,
            }}
          >
            <h3 className="text-2xl font-bold mb-4">{business.ctaButtonText}</h3>
            <p className="mb-6">Ready to work with us? Contact us today!</p>
            <a
              href={`mailto:${business.email}`}
              className="inline-block px-8 py-3 font-bold rounded-lg transition-all hover:scale-105"
              style={{
                backgroundColor: 'white',
                color: primaryColor,
              }}
            >
              {business.ctaButtonText}
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-20 px-4 py-12 text-white" style={{ backgroundColor: primaryColor }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="font-bold mb-4 text-lg">{business.businessName}</h4>
              <p className="text-sm opacity-90">
                {business.shortDescription.substring(0, 100)}...
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-lg">Quick Links</h4>
              <button
                onClick={scrollToContact}
                className="text-sm opacity-90 hover:opacity-100 cursor-pointer"
              >
                Contact
              </button>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-lg">Hours</h4>
              <p className="text-sm opacity-90">{business.businessHours.monday}</p>
              <p className="text-sm opacity-90">{business.businessHours.saturday}</p>
            </div>
          </div>
          <div className="border-t border-opacity-30 border-white pt-6 text-center text-sm">
            <p>&copy; {new Date().getFullYear()} {business.businessName}. All rights reserved.</p>
            <p className="text-xs opacity-75 mt-2">
              Created with Atlas Local Business Website Generator
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default WebsitePreview;
