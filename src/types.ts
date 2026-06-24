import React from 'react';

export interface BusinessData {
  id: string;
  businessName: string;
  businessType: string;
  city: string;
  state: string;
  phoneNumber: string;
  email: string;
  websiteHeadline: string;
  shortDescription: string;
  servicesOffered: string[];
  businessHours: {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
  };
  address: string;
  facebookUrl: string;
  instagramUrl: string;
  ctaButtonText: string;
  templateStyle: TemplateStyle;
  createdAt: number;
  updatedAt: number;
}

export type TemplateStyle = 'clean-professional' | 'boutique-elegant' | 'contractor-bold' | 'restaurant-warm' | 'beauty-studio';

export const TEMPLATE_STYLES: Record<TemplateStyle, {
  name: string;
  description: string;
  primaryColor: string;
  accentColor: string;
  fontFamily: string;
  borderRadius: string;
}> = {
  'clean-professional': {
    name: 'Clean Professional',
    description: 'Modern and minimalist',
    primaryColor: '#1f2937',
    accentColor: '#3b82f6',
    fontFamily: 'sans-serif',
    borderRadius: 'rounded-lg',
  },
  'boutique-elegant': {
    name: 'Boutique Elegant',
    description: 'Sophisticated and refined',
    primaryColor: '#5b21b6',
    accentColor: '#ec4899',
    fontFamily: 'serif',
    borderRadius: 'rounded-2xl',
  },
  'contractor-bold': {
    name: 'Contractor Bold',
    description: 'Strong and reliable',
    primaryColor: '#1e40af',
    accentColor: '#f97316',
    fontFamily: 'sans-serif',
    borderRadius: 'rounded',
  },
  'restaurant-warm': {
    name: 'Restaurant Warm',
    description: 'Inviting and friendly',
    primaryColor: '#7c2d12',
    accentColor: '#ea580c',
    fontFamily: 'serif',
    borderRadius: 'rounded-xl',
  },
  'beauty-studio': {
    name: 'Beauty Studio',
    description: 'Trendy and modern',
    primaryColor: '#be123c',
    accentColor: '#f472b6',
    fontFamily: 'sans-serif',
    borderRadius: 'rounded-3xl',
  },
};

export const SAMPLE_BUSINESS: BusinessData = {
  id: 'sample-1',
  businessName: 'Dewitt Flower & Gift Shop',
  businessType: 'Florist',
  city: 'DeWitt',
  state: 'Arkansas',
  phoneNumber: '(870) 946-2434',
  email: 'hello@dewitflowers.com',
  websiteHeadline: 'Fresh Flowers & Thoughtful Gifts for Every Occasion',
  shortDescription: 'For over 20 years, Dewitt Flower & Gift Shop has been the premier destination for beautiful floral arrangements and unique gifts in DeWitt, Arkansas.',
  servicesOffered: ['Bouquets', 'Sympathy Flowers', 'Wedding Flowers', 'Gift Baskets', 'Seasonal Arrangements'],
  businessHours: {
    monday: '9:00 AM - 5:00 PM',
    tuesday: '9:00 AM - 5:00 PM',
    wednesday: '9:00 AM - 5:00 PM',
    thursday: '9:00 AM - 5:00 PM',
    friday: '9:00 AM - 6:00 PM',
    saturday: '10:00 AM - 4:00 PM',
    sunday: 'Closed',
  },
  address: '123 Main Street, DeWitt, AR 72042',
  facebookUrl: 'https://facebook.com/dewitflowers',
  instagramUrl: 'https://instagram.com/dewitflowers',
  ctaButtonText: 'Order Now',
  templateStyle: 'restaurant-warm',
  createdAt: Date.now(),
  updatedAt: Date.now(),
};
