# ArtLoop - AI-Powered Sketch-to-Art Transformation

ArtLoop is a cutting-edge web application that transforms rough sketches into refined artwork using advanced AI technology. With an intuitive interface and powerful backend, ArtLoop enables creators to bring their ideas to life quickly and effortlessly.

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [Components](#components)
  - [Core Components](#core-components)
  - [UI Components](#ui-components)
- [Pages](#pages)
- [Services](#services)
- [Development](#development)
  - [Available Scripts](#available-scripts)
  - [Code Quality](#code-quality)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Features

### Drawing Tools
- **Intuitive Canvas**: Clean, responsive drawing canvas with 1280x720 resolution
- **Brush Tools**: Multiple drawing tools including brush, pencil, and eraser
- **Customization**: Adjustable brush size (1-50px) and color selection
- **Canvas Controls**: Clear canvas functionality

### AI Generation
- **Style Presets**: Multiple artistic styles (realistic, anime, cartoon, oil paint, sketch, cyberpunk)
- **Quality Controls**: Adjustable generation parameters (steps, guidance)
- **Prompt-Based**: Text prompts to guide AI generation
- **Credit System**: Track and manage generation credits

### User Experience
- **Responsive Design**: Works seamlessly across devices
- **Authentication**: Secure login and registration using Appwrite
- **Animated UI**: Smooth animations with Framer Motion and GSAP
- **Modern UI**: Glowing card effects and gradient backgrounds

## Tech Stack

### Frontend
- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with custom fonts
- **UI Components**: ShadCN UI components
- **Animation**: Framer Motion, GSAP
- **Routing**: React Router DOM

### Backend Integration
- **Authentication**: Appwrite
- **API Communication**: Axios
- **State Management**: React Hooks

### Deployment
- **Platform**: Vercel
- **Environment**: Node.js

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Appwrite instance
- Backend API (separate service)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/artloop-front.git
   cd artloop-front
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
VITE_APPWRITE_ENDPOINT=your_appwrite_endpoint
VITE_APPWRITE_PROJECT_ID=your_appwrite_project_id
VITE_API_BASE_URL=your_api_base_url
```

## Project Structure

```
src/
├── assets/           # Images, fonts, and other static assets
│   ├── color-palette.png
│   ├── desc-image.png
│   ├── hero-image.png
│   └── fonts/        # Custom font files
├── components/       # Reusable UI components
│   ├── ArtloopLanding.tsx
│   ├── CanvasArea.tsx
│   ├── CTASection.tsx
│   ├── DescriptionSection.tsx
│   ├── FeaturesSection.tsx
│   ├── Footer.tsx
│   ├── GenerationPopup.tsx
│   ├── GlowyCard.tsx
│   ├── GlowyCardWrapper.tsx
│   ├── Header.tsx
│   ├── HeaderWorkspace.tsx
│   ├── HeroSection.tsx
│   ├── Navbar.tsx
│   ├── TextReveal.tsx
│   ├── Toolbar.tsx
│   ├── TypedText.tsx
│   ├── Workspace.tsx
│   ├── magicui/      # Special effect components
│   └── ui/           # ShadCN UI components
├── hooks/            # Custom React hooks
├── lib/              # Utility functions
├── pages/            # Page components for routing
│   ├── Auth.tsx
│   ├── Index.tsx
│   ├── NotFound.tsx
│   └── workspace.tsx
├── services/         # API and authentication services
│   ├── api.ts
│   └── appwrite.ts
├── App.tsx           # Main application component
├── main.tsx          # Entry point
└── vite-env.d.ts     # TypeScript declarations
```

## Components

### Core Components

#### ArtloopLanding
The main landing page component that orchestrates the entire homepage experience.
- Integrates all landing page sections
- Handles user authentication state
- Implements responsive navigation header

#### Workspace
The primary drawing and generation interface.
- Canvas drawing functionality with brush/pencil/eraser tools
- Generation popup for AI image creation
- Credit management system
- User authentication integration

#### Header/HeaderWorkspace
Navigation headers for different views.
- Responsive design with mobile menu
- User profile dropdown with sign-out functionality
- Credit display in workspace view

#### Toolbar
Drawing tools and controls.
- Brush/pencil/eraser selection
- Color picker with custom palette
- Brush size slider (1-50px)
- Canvas clear button

#### CanvasArea
Interactive drawing canvas.
- 1280x720 resolution canvas
- Mouse event handlers for drawing
- Crosshair cursor for precision

#### GenerationPopup
Modal for AI generation parameters.
- Text prompt input
- Style preset selection
- Image preview and download
- Generation status indicators

#### HeroSection
Landing page hero section.
- Animated typed text showcasing capabilities
- Call-to-action button
- Hero image display with glowing effect

#### DescriptionSection
Project description and value proposition.
- Text reveal animation
- Feature explanation with image

#### FeaturesSection
Key features showcase.
- Three-feature card layout
- Glowing card effects
- Iconography for visual appeal

#### CTASection
Call-to-action section.
- Final conversion point
- Glowing card container
- Prominent sign-up button

#### Footer
Site footer with social links.
- Logo and brand name
- GitHub and LinkedIn links
- Creator attribution

### UI Components

Custom UI components built with ShadCN UI:
- Buttons with various styles and states
- Cards with glowing effects
- Form elements (inputs, textareas, sliders)
- Navigation components
- Modals and popups
- Animated elements

Special effect components:
- GlowyCard and GlowyCardWrapper for glowing effects
- RetroGrid for background patterns
- FlickeringGrid for authentication page

## Pages

### Index
Landing page with marketing content.
- Routes to workspace if user is authenticated
- Routes to auth page if user is not authenticated

### Auth
User authentication (login/register).
- Toggle between login and registration forms
- Form validation and error handling
- Integration with Appwrite authentication
- Loading states and toast notifications

### Workspace
Main application interface for drawing and generation.
- Full-screen canvas with drawing tools
- Generation popup with AI controls
- Credit management
- User profile integration

### NotFound
404 error page.
- Simple error page for undefined routes

## Services

### api.ts
API client for backend communication.
- Axios instance with base URL configuration
- Request interceptor for authentication token
- API functions for login, registration, and image generation

### appwrite.ts
Appwrite authentication service.
- Appwrite client initialization
- Account management functions
- Session handling

## Development

### Available Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run build:dev`: Build for development
- `npm run lint`: Run ESLint
- `npm run preview`: Preview production build

### Code Quality

- TypeScript for type safety
- ESLint for code linting
- Prettier for code formatting (configured via ESLint)
- Component-based architecture
- Reusable UI components
- Consistent naming conventions

## Deployment

The application is configured for deployment on Vercel. To deploy:

1. Push to a GitHub repository
2. Connect the repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy!

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Made with ❤️ by [@hksharma2004](https://github.com/hksharma2004)