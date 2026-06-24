# Atlas Local Business Website Generator

Create a clean, professional local business website in minutes. No coding required, no backend, no expensive tools.

## Features

✨ **Instant Website Creation** - Fill out a simple form and get a professional website

🎨 **5 Professional Templates** - Choose from Clean Professional, Boutique Elegant, Contractor Bold, Restaurant Warm, or Beauty Studio

📱 **Fully Mobile Responsive** - Works perfectly on phones, tablets, and desktops

💾 **Save & Manage Projects** - Store multiple projects in browser LocalStorage

📤 **Multiple Export Options**
- Download as standalone HTML file
- Download as text
- Copy text to clipboard
- Print preview

🎯 **Complete Website Sections**
- Hero section with headline and CTA
- About section
- Services showcase
- Business hours
- Contact information with social links
- Footer

📊 **Form Fields Included**
- Business name and type
- Location (city, state, address)
- Contact information (phone, email)
- Website headline and description
- Services offered
- Business hours (7 days)
- Social media links (Facebook, Instagram)
- Call-to-action button text

## Getting Started

### Prerequisites
- Node.js 16+ and npm

### Installation

1. Clone the repository
```bash
git clone https://github.com/momentummediamain-ctrl/atlas-local-business-website.git
cd atlas-local-business-website
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

This creates a `dist` folder with optimized production files.

## Usage

1. **Start Building** - Click "Start Building" on the landing page to begin
2. **Fill Out Form** - Enter your business information
3. **Choose Template** - Select one of 5 professional templates
4. **Live Preview** - See changes in real-time as you type
5. **Save Project** - Save your website to browser storage
6. **Export** - Download HTML, text, or print your website

## Sample Data

The app comes with a sample business (Dewitt Flower & Gift Shop) to help you get started. You can edit it or create a new project.

## Technology Stack

- **React 18** - UI framework
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool
- **Tailwind CSS** - Utility-first CSS framework
- **LocalStorage** - Client-side data persistence

## No External Dependencies

- ✅ No backend required
- ✅ No paid APIs or services
- ✅ No authentication needed
- ✅ Completely free
- ✅ Works offline (except initial load)

## Browser Support

Works on all modern browsers:
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

## Project Structure

```
src/
├── components/
│   ├── LandingPage.tsx        # Landing page
│   ├── BusinessForm.tsx       # Main form component
│   ├── WebsitePreview.tsx     # Live preview component
│   ├── ProjectsList.tsx       # Saved projects list
│   └── ExportTools.tsx        # Export functionality
├── types.ts                   # TypeScript interfaces
├── storage.ts                 # LocalStorage utilities
├── utils.tsx                  # Helper functions
├── App.tsx                    # Main app component
├── App.css                    # Additional styles
├── index.css                  # Global styles
└── main.tsx                   # Entry point
```

## Features Breakdown

### 1. Landing Page
- Attractive hero section
- App tagline and description
- Call-to-action button
- Feature highlights

### 2. Business Intake Form
- Collapsible sections for easy navigation
- 5 professional templates to choose from
- Form validation
- Real-time preview updates

### 3. Live Website Preview
- Updates in real-time as you fill the form
- Template-aware styling
- Fully functional website preview
- Responsive design preview

### 4. Template Styles
Each template includes:
- Primary and accent colors
- Custom fonts (sans-serif or serif)
- Unique border radius and spacing
- Professional color schemes

### 5. Project Management
- Save unlimited projects
- View all saved projects
- Edit existing projects
- Delete projects with confirmation
- Auto-update timestamps

### 6. Export Tools
- **HTML Export** - Complete standalone website file
- **Text Export** - Website content as plain text
- **Copy Text** - Quick copy to clipboard
- **Print** - Print-optimized preview

### 7. Responsive Design
- Desktop: Sidebar navigation with multi-panel layout
- Mobile: Bottom navigation with single-panel switching
- Tablet: Optimized touch-friendly interface

## Sample Business Data

The app includes pre-filled sample data:
- **Business**: Dewitt Flower & Gift Shop
- **Type**: Florist
- **Location**: DeWitt, Arkansas
- **Services**: Bouquets, Sympathy Flowers, Wedding Flowers, Gift Baskets, Seasonal Arrangements
- **Template**: Restaurant Warm

## Tips

1. **Quick Start** - Use the sample business as a starting point, then customize
2. **Save Often** - Click "Save Project" to store your work
3. **Template Testing** - Try different templates to see which fits best
4. **Mobile Preview** - Resize your browser to see responsive design
5. **HTML Download** - The downloaded HTML file works standalone in any browser

## Troubleshooting

**Projects not saving?**
- Check if LocalStorage is enabled in your browser
- Try clearing browser cache and reloading

**Export not working?**
- Ensure pop-ups are not blocked
- Try a different browser

**Preview not updating?**
- Refresh the page
- Try a different template

## Future Enhancements

Potential additions:
- More template styles
- Gallery/portfolio section
- Team members section
- Testimonials
- Cloud sync
- Domain connection
- SEO customization

## License

MIT License - Free to use and modify

## Support

For issues or feature requests, please open an issue on GitHub.

---

**Made with ❤️ for small local businesses**
