import React, { useState, useEffect } from 'react';
import { BusinessData, TemplateStyle, TEMPLATE_STYLES } from '../types';
import { FiChevronDown } from 'react-icons/fi';

interface BusinessFormProps {
  initialData?: BusinessData | null;
  onSave: (data: BusinessData) => void;
  onChange: (data: Partial<BusinessData>) => void;
}

const BusinessForm: React.FC<BusinessFormProps> = ({
  initialData,
  onSave,
  onChange,
}) => {
  const [formData, setFormData] = useState<BusinessData>(
    initialData || {
      id: Date.now().toString(),
      businessName: '',
      businessType: '',
      city: '',
      state: '',
      phoneNumber: '',
      email: '',
      websiteHeadline: '',
      shortDescription: '',
      servicesOffered: [],
      businessHours: {
        monday: '9:00 AM - 5:00 PM',
        tuesday: '9:00 AM - 5:00 PM',
        wednesday: '9:00 AM - 5:00 PM',
        thursday: '9:00 AM - 5:00 PM',
        friday: '9:00 AM - 5:00 PM',
        saturday: '10:00 AM - 4:00 PM',
        sunday: 'Closed',
      },
      address: '',
      facebookUrl: '',
      instagramUrl: '',
      ctaButtonText: 'Get in Touch',
      templateStyle: 'clean-professional',
      createdAt: Date.now(),
      updatedAt: Date.now(),
    }
  );

  const [serviceInput, setServiceInput] = useState('');
  const [expandedSection, setExpandedSection] = useState<string | null>('basic');

  const handleInputChange = (field: keyof BusinessData, value: any) => {
    const updated = { ...formData, [field]: value };
    setFormData(updated);
    onChange(updated);
  };

  const handleHourChange = (day: string, value: string) => {
    const updated = {
      ...formData,
      businessHours: { ...formData.businessHours, [day]: value },
    };
    setFormData(updated);
    onChange(updated);
  };

  const addService = () => {
    if (serviceInput.trim()) {
      const updated = {
        ...formData,
        servicesOffered: [...formData.servicesOffered, serviceInput],
      };
      setFormData(updated);
      onChange(updated);
      setServiceInput('');
    }
  };

  const removeService = (index: number) => {
    const updated = {
      ...formData,
      servicesOffered: formData.servicesOffered.filter((_, i) => i !== index),
    };
    setFormData(updated);
    onChange(updated);
  };

  const handleSave = () => {
    if (!formData.businessName || !formData.email) {
      alert('Please fill in business name and email');
      return;
    }
    onSave(formData);
  };

  const SectionHeader: React.FC<{ title: string; id: string }> = ({
    title,
    id,
  }) => (
    <button
      onClick={() =>
        setExpandedSection(expandedSection === id ? null : id)
      }
      className="w-full flex items-center justify-between bg-blue-50 hover:bg-blue-100 p-4 rounded-lg font-bold text-blue-900 transition-colors"
    >
      <span>{title}</span>
      <span
        className={`transition-transform ${
          expandedSection === id ? 'rotate-180' : ''
        }`}
      >
        ▼
      </span>
    </button>
  );

  return (
    <div className="space-y-6 pb-8">
      {/* Template Selection */}
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <label className="block text-sm font-semibold mb-3 text-gray-700">
          Website Template Style
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {(Object.keys(TEMPLATE_STYLES) as TemplateStyle[]).map((style) => (
            <button
              key={style}
              onClick={() => handleInputChange('templateStyle', style)}
              className={`p-3 rounded-lg border-2 text-left transition-all ${
                formData.templateStyle === style
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="font-semibold text-sm">
                {TEMPLATE_STYLES[style].name}
              </div>
              <div className="text-xs text-gray-600">
                {TEMPLATE_STYLES[style].description}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Basic Information */}
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <SectionHeader title="📋 Business Information" id="basic" />
        {expandedSection === 'basic' && (
          <div className="mt-4 space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-1 text-gray-700">
                Business Name *
              </label>
              <input
                type="text"
                value={formData.businessName}
                onChange={(e) =>
                  handleInputChange('businessName', e.target.value)
                }
                placeholder="Your Business Name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-semibold mb-1 text-gray-700">
                  Business Type
                </label>
                <input
                  type="text"
                  value={formData.businessType}
                  onChange={(e) =>
                    handleInputChange('businessType', e.target.value)
                  }
                  placeholder="e.g., Florist"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1 text-gray-700">
                  City
                </label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  placeholder="City"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-semibold mb-1 text-gray-700">
                  State
                </label>
                <input
                  type="text"
                  value={formData.state}
                  onChange={(e) => handleInputChange('state', e.target.value)}
                  placeholder="State"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1 text-gray-700">
                  Address
                </label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  placeholder="Street Address"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Contact Information */}
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <SectionHeader title="📞 Contact Information" id="contact" />
        {expandedSection === 'contact' && (
          <div className="mt-4 space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-1 text-gray-700">
                Phone Number
              </label>
              <input
                type="tel"
                value={formData.phoneNumber}
                onChange={(e) =>
                  handleInputChange('phoneNumber', e.target.value)
                }
                placeholder="(123) 456-7890"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1 text-gray-700">
                Email Address *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="hello@business.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1 text-gray-700">
                Facebook URL
              </label>
              <input
                type="url"
                value={formData.facebookUrl}
                onChange={(e) =>
                  handleInputChange('facebookUrl', e.target.value)
                }
                placeholder="https://facebook.com/yourpage"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1 text-gray-700">
                Instagram URL
              </label>
              <input
                type="url"
                value={formData.instagramUrl}
                onChange={(e) =>
                  handleInputChange('instagramUrl', e.target.value)
                }
                placeholder="https://instagram.com/yourpage"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        )}
      </div>

      {/* Website Content */}
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <SectionHeader title="✏️ Website Content" id="content" />
        {expandedSection === 'content' && (
          <div className="mt-4 space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-1 text-gray-700">
                Website Headline
              </label>
              <input
                type="text"
                value={formData.websiteHeadline}
                onChange={(e) =>
                  handleInputChange('websiteHeadline', e.target.value)
                }
                placeholder="What will you say in your hero section?"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1 text-gray-700">
                Short Description
              </label>
              <textarea
                value={formData.shortDescription}
                onChange={(e) =>
                  handleInputChange('shortDescription', e.target.value)
                }
                placeholder="Tell visitors about your business..."
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1 text-gray-700">
                Call-to-Action Button Text
              </label>
              <input
                type="text"
                value={formData.ctaButtonText}
                onChange={(e) =>
                  handleInputChange('ctaButtonText', e.target.value)
                }
                placeholder="e.g., Get in Touch"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        )}
      </div>

      {/* Services */}
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <SectionHeader title="🎯 Services" id="services" />
        {expandedSection === 'services' && (
          <div className="mt-4 space-y-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={serviceInput}
                onChange={(e) => setServiceInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') addService();
                }}
                placeholder="Add a service (e.g., Bouquets)"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={addService}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-semibold"
              >
                Add
              </button>
            </div>

            {formData.servicesOffered.length > 0 && (
              <div className="space-y-2">
                {formData.servicesOffered.map((service, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between bg-blue-50 p-3 rounded-lg"
                  >
                    <span className="font-medium">{service}</span>
                    <button
                      onClick={() => removeService(idx)}
                      className="text-red-500 hover:text-red-700 font-bold"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Business Hours */}
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <SectionHeader title="🕒 Business Hours" id="hours" />
        {expandedSection === 'hours' && (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(formData.businessHours).map(([day, hours]) => (
              <div key={day}>
                <label className="block text-sm font-semibold mb-1 text-gray-700">
                  {day.charAt(0).toUpperCase() + day.slice(1)}
                </label>
                <input
                  type="text"
                  value={hours}
                  onChange={(e) => handleHourChange(day, e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Save Button */}
      <button
        onClick={handleSave}
        className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-lg transition-colors shadow-md"
      >
        ✓ Save Project
      </button>
    </div>
  );
};

export default BusinessForm;
