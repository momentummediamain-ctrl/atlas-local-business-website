import React, { useState, useEffect } from 'react';
import { BusinessData, TEMPLATE_STYLES } from '../types';

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'info';
}

const Toast: React.FC<ToastProps> = ({ message, type }) => {
  const bgColor = type === 'success' ? 'bg-green-500' : type === 'error' ? 'bg-red-500' : 'bg-blue-500';
  return (
    <div className={`${bgColor} text-white px-4 py-2 rounded-lg shadow-lg`}>
      {message}
    </div>
  );
};

export const useToast = () => {
  const [toast, setToast] = useState<ToastProps | null>(null);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  return { toast, showToast, Toast };
};

interface ExportOptions {
  format: 'html' | 'txt';
}

export const exportWebsite = (business: BusinessData, format: ExportOptions['format']) => {
  if (format === 'html') {
    return generateHTMLFile(business);
  } else if (format === 'txt') {
    return generateTextFile(business);
  }
};

const generateHTMLFile = (business: BusinessData): string => {
  const template = TEMPLATE_STYLES[business.templateStyle];
  const accentColor = template.accentColor;
  const primaryColor = template.primaryColor;
  const fontFamily = template.fontFamily === 'serif' ? 'Georgia, serif' : 'system-ui, sans-serif';

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${business.businessName}</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: ${fontFamily};
            color: #333;
            line-height: 1.6;
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
        }
        header {
            background-color: ${primaryColor};
            color: white;
            padding: 20px 0;
            position: sticky;
            top: 0;
            z-index: 100;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        header nav {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        header h1 {
            font-size: 24px;
            font-weight: bold;
        }
        header .contact-info {
            display: flex;
            gap: 20px;
            font-size: 14px;
        }
        @media (max-width: 768px) {
            header .contact-info {
                flex-direction: column;
                gap: 10px;
            }
        }
        .hero {
            background: linear-gradient(135deg, ${primaryColor} 0%, ${accentColor} 100%);
            color: white;
            padding: 80px 20px;
            text-align: center;
            min-height: 400px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }
        .hero h2 {
            font-size: 48px;
            margin-bottom: 20px;
            font-weight: bold;
        }
        .hero p {
            font-size: 20px;
            margin-bottom: 40px;
            max-width: 600px;
        }
        .btn {
            display: inline-block;
            background-color: ${accentColor};
            color: white;
            padding: 15px 40px;
            text-decoration: none;
            border-radius: 8px;
            font-size: 16px;
            font-weight: bold;
            border: none;
            cursor: pointer;
            transition: transform 0.3s, box-shadow 0.3s;
        }
        .btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 20px rgba(0,0,0,0.2);
        }
        @media (max-width: 768px) {
            .hero h2 {
                font-size: 32px;
            }
            .hero p {
                font-size: 16px;
            }
        }
        section {
            padding: 60px 20px;
        }
        section h2 {
            font-size: 36px;
            margin-bottom: 30px;
            color: ${primaryColor};
            text-align: center;
            font-weight: bold;
        }
        .about {
            background-color: #f9fafb;
        }
        .about p {
            font-size: 16px;
            line-height: 1.8;
            margin-bottom: 20px;
        }
        .services {
            background-color: white;
        }
        .services-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 30px;
            margin-top: 30px;
        }
        .service-card {
            background: white;
            border: 2px solid ${accentColor};
            padding: 25px;
            border-radius: 12px;
            text-align: center;
            transition: transform 0.3s, box-shadow 0.3s;
        }
        .service-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 25px rgba(0,0,0,0.1);
        }
        .service-card h3 {
            color: ${accentColor};
            font-size: 20px;
            margin-bottom: 10px;
            font-weight: bold;
        }
        .hours {
            background-color: #f9fafb;
        }
        .hours-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin-top: 30px;
        }
        .hours-item {
            background: white;
            padding: 15px;
            border-left: 4px solid ${accentColor};
            border-radius: 4px;
        }
        .hours-item strong {
            color: ${primaryColor};
        }
        .contact {
            background-color: white;
        }
        .contact-content {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 40px;
            margin-top: 30px;
        }
        @media (max-width: 768px) {
            .contact-content {
                grid-template-columns: 1fr;
            }
        }
        .contact-info-box {
            background-color: #f9fafb;
            padding: 30px;
            border-radius: 12px;
        }
        .contact-info-box h3 {
            color: ${primaryColor};
            margin-bottom: 20px;
            font-size: 18px;
            font-weight: bold;
        }
        .contact-info-box p {
            margin-bottom: 15px;
            display: flex;
            align-items: center;
            gap: 10px;
        }
        .contact-info-box a {
            color: ${accentColor};
            text-decoration: none;
            font-weight: bold;
        }
        .contact-info-box a:hover {
            text-decoration: underline;
        }
        .cta-section {
            background: linear-gradient(135deg, ${primaryColor} 0%, ${accentColor} 100%);
            color: white;
            text-align: center;
            padding: 40px;
            border-radius: 12px;
            margin-top: 30px;
        }
        .cta-section h3 {
            font-size: 24px;
            margin-bottom: 20px;
            font-weight: bold;
        }
        .social-links {
            display: flex;
            justify-content: center;
            gap: 20px;
            margin-top: 20px;
        }
        .social-links a {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 45px;
            height: 45px;
            background-color: ${accentColor};
            color: white;
            border-radius: 50%;
            text-decoration: none;
            font-weight: bold;
            font-size: 18px;
            transition: transform 0.3s, background-color 0.3s;
        }
        .social-links a:hover {
            transform: scale(1.1);
            background-color: ${primaryColor};
        }
        footer {
            background-color: ${primaryColor};
            color: white;
            text-align: center;
            padding: 30px 20px;
            margin-top: 60px;
        }
        footer p {
            margin: 10px 0;
        }
        footer .footer-content {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 30px;
            margin-bottom: 30px;
            text-align: left;
        }
        @media (max-width: 768px) {
            footer .footer-content {
                grid-template-columns: 1fr;
                text-align: center;
            }
        }
        footer h4 {
            margin-bottom: 15px;
            font-size: 16px;
            font-weight: bold;
        }
        footer a {
            color: #e0e0e0;
            text-decoration: none;
        }
        footer a:hover {
            color: white;
        }
    </style>
</head>
<body>
    <header>
        <div class="container">
            <nav>
                <h1>${business.businessName}</h1>
                <div class="contact-info">
                    <a href="tel:${business.phoneNumber}">${business.phoneNumber}</a>
                    <a href="mailto:${business.email}">${business.email}</a>
                </div>
            </nav>
        </div>
    </header>

    <section class="hero">
        <div class="container">
            <h2>${business.websiteHeadline}</h2>
            <p>${business.shortDescription}</p>
            <button class="btn" onclick="document.getElementById('contact').scrollIntoView({behavior: 'smooth'})">${business.ctaButtonText}</button>
        </div>
    </section>

    <section class="about">
        <div class="container">
            <h2>About Us</h2>
            <p>${business.shortDescription}</p>
        </div>
    </section>

    ${business.servicesOffered.length > 0 ? `
    <section class="services">
        <div class="container">
            <h2>Our Services</h2>
            <div class="services-grid">
                ${business.servicesOffered.map(service => `
                <div class="service-card">
                    <h3>${service}</h3>
                    <p>Premium quality ${service.toLowerCase()} tailored to your needs.</p>
                </div>
                `).join('')}
            </div>
        </div>
    </section>
    ` : ''}

    <section class="hours">
        <div class="container">
            <h2>Business Hours</h2>
            <div class="hours-grid">
                ${Object.entries(business.businessHours).map(([day, hours]) => `
                <div class="hours-item">
                    <strong>${day.charAt(0).toUpperCase() + day.slice(1)}</strong>
                    <p>${hours}</p>
                </div>
                `).join('')}
            </div>
        </div>
    </section>

    <section class="contact" id="contact">
        <div class="container">
            <h2>Contact Us</h2>
            <div class="contact-content">
                <div class="contact-info-box">
                    <h3>Get in Touch</h3>
                    <p>📞 <a href="tel:${business.phoneNumber}">${business.phoneNumber}</a></p>
                    <p>✉️ <a href="mailto:${business.email}">${business.email}</a></p>
                    <p>📍 ${business.address}</p>
                </div>
                <div class="contact-info-box">
                    <h3>Follow Us</h3>
                    <div class="social-links">
                        ${business.facebookUrl ? `<a href="${business.facebookUrl}" target="_blank" title="Facebook">f</a>` : ''}
                        ${business.instagramUrl ? `<a href="${business.instagramUrl}" target="_blank" title="Instagram">📷</a>` : ''}
                    </div>
                </div>
            </div>
            <div class="cta-section">
                <h3>${business.ctaButtonText}</h3>
                <p>Ready to work with us? Contact us today!</p>
                <a href="mailto:${business.email}" class="btn" style="background-color: white; color: ${primaryColor}; margin-top: 20px;">${business.ctaButtonText}</a>
            </div>
        </div>
    </section>

    <footer>
        <div class="container">
            <div class="footer-content">
                <div>
                    <h4>${business.businessName}</h4>
                    <p>${business.shortDescription.substring(0, 100)}...</p>
                </div>
                <div>
                    <h4>Quick Links</h4>
                    <p><a href="#contact">Contact</a></p>
                </div>
                <div>
                    <h4>Hours</h4>
                    <p>${business.businessHours.monday}</p>
                    <p>${business.businessHours.saturday}</p>
                </div>
            </div>
            <p>&copy; ${new Date().getFullYear()} ${business.businessName}. All rights reserved.</p>
            <p style="font-size: 12px; margin-top: 15px;">Created with Atlas Local Business Website Generator</p>
        </div>
    </footer>
</body>
</html>`;
};

const generateTextFile = (business: BusinessData): string => {
  return `${business.businessName}
${'='.repeat(business.businessName.length)}

Business Type: ${business.businessType}
Location: ${business.city}, ${business.state}

${business.websiteHeadline}

${business.shortDescription}

--- CONTACT INFORMATION ---
Phone: ${business.phoneNumber}
Email: ${business.email}
Address: ${business.address}

--- SERVICES ---
${business.servicesOffered.map(s => `• ${s}`).join('\n')}

--- BUSINESS HOURS ---
${Object.entries(business.businessHours).map(([day, hours]) => `${day.charAt(0).toUpperCase() + day.slice(1)}: ${hours}`).join('\n')}

--- SOCIAL MEDIA ---
Facebook: ${business.facebookUrl}
Instagram: ${business.instagramUrl}

Call to Action: ${business.ctaButtonText}

Generated by Atlas Local Business Website Generator`;
};
