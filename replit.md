# おでよみ (Weather-Based Clothing & Playground Recommendation System)

## Overview

This is a full-stack web application called "おでよみ" that provides clothing recommendations and playground suggestions based on weather conditions and age groups. The system helps users choose appropriate clothing and find suitable play venues by analyzing temperature, humidity, weather conditions, and age-specific needs (toddler, preschool, school).

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript
- **UI Library**: Radix UI components with shadcn/ui styling
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **State Management**: React Query (@tanstack/react-query) for server state
- **Routing**: Wouter for client-side routing
- **Form Handling**: React Hook Form with Zod validation
- **Build Tool**: Vite for fast development and bundling

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ESM modules
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (@neondatabase/serverless)
- **Session Management**: PostgreSQL-backed sessions (connect-pg-simple)
- **API Design**: RESTful API with JSON responses

### Development Setup
- **Hot Reload**: Vite dev server with HMR
- **Type Safety**: TypeScript strict mode across client, server, and shared code
- **Code Quality**: ESLint and Prettier configuration
- **Environment**: Replit-optimized with custom plugins

## Key Components

### Database Schema
The system uses two main tables:
- `weather_conditions`: Stores weather parameters (temperature, humidity, condition, age group)
- `clothing_recommendations`: Stores clothing suggestions with categories (tops, bottoms, shoes, accessories, protection)

### API Endpoints
- `POST /api/recommendations`: Get clothing recommendations based on weather input
- `POST /api/current-weather`: Get current weather data based on geolocation coordinates
- `POST /api/playgrounds`: Get playground recommendations based on weather and location
- `GET /api/playgrounds/:id`: Get detailed playground information
- `GET /api/health`: Health check endpoint

### Data Storage
- **Production**: PostgreSQL with Drizzle ORM using Neon Database
- **Development**: PostgreSQL database with age-specific clothing recommendations
- **Migration**: Drizzle Kit for database schema management
- **Database Connection**: Neon serverless PostgreSQL with WebSocket support

### UI Components
- Comprehensive component library using Radix UI primitives
- Fully accessible components with proper ARIA attributes
- Responsive design with mobile-first approach
- Dark/light theme support via CSS variables

## Data Flow

1. User inputs weather conditions through the frontend form
2. Client validates input using Zod schemas
3. API request sent to `/api/recommendations` endpoint
4. Server validates request and queries recommendations from storage
5. Recommendations filtered based on weather conditions and age group
6. Response includes weather input, recommendations, and generation timestamp
7. Frontend displays recommendations with detailed descriptions and reasoning

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL database connectivity
- **drizzle-orm**: Type-safe database operations
- **@tanstack/react-query**: Server state management
- **@radix-ui/***: Accessible UI components
- **zod**: Runtime type validation
- **wouter**: Lightweight routing

### Development Dependencies
- **vite**: Build tool and dev server
- **typescript**: Type checking
- **tailwindcss**: Utility-first CSS framework
- **@replit/vite-plugin-***: Replit-specific optimizations

## Deployment Strategy

### Development
- **Command**: `npm run dev`
- **Server**: Express with Vite middleware for HMR
- **Database**: In-memory storage for rapid development

### Production
- **Build**: `npm run build` - Creates optimized client bundle and server bundle
- **Server**: `npm start` - Runs production Express server
- **Database**: PostgreSQL via Neon Database
- **Static Assets**: Served directly by Express

### Environment Configuration
- `DATABASE_URL`: PostgreSQL connection string
- `NODE_ENV`: Environment mode (development/production)
- Database migrations managed via `npm run db:push`

## Changelog

Changelog:
- July 07, 2025: Initial setup with age-specific clothing recommendations
- July 07, 2025: Added PostgreSQL database integration with Neon Database
- Database migration completed with weather_conditions and clothing_recommendations tables
- Switched from in-memory storage to DatabaseStorage for production data persistence
- July 07, 2025: Added current weather API integration using Open-Meteo
- Implemented geolocation-based weather detection with automatic form population
- Added "現在地の天気" button for real-time weather data retrieval
- July 07, 2025: Enhanced accessories recommendations (3+ items per query)
- Added age-specific and weather-specific additional accessories
- Implemented item icons using emoji for visual appeal (excluding accessories per user preference)
- July 07, 2025: Implemented location-based playground recommendations
- Added weather-appropriate playground suggestions with 10 different categories
- Playground service provides indoor, outdoor, covered, water, educational, and adventure venues
- Integrated weather suitability scoring system (0-10 scale)
- Added playground API endpoints with distance calculation and safety information
- Fixed temperature-based filtering: water activities (beaches) now excluded below 20°C for child safety
- July 07, 2025: Added real playground locations with official names and Google Maps integration
- Updated playground database with authentic Tokyo-area venues (Showa Kinen Park, Sumida Aquarium, etc.)
- Integrated clickable Google Maps links for each recommended playground location
- July 07, 2025: Enhanced navigation and accessibility
- Added fixed navigation bar with section jump buttons
- Implemented smooth scroll to weather input, recommendations, and playground sections
- Added floating "back to top" button that appears after scrolling 300px
- All sections now have proper scroll margin for fixed header offset
- July 07, 2025: Streamlined user experience with automatic playground recommendations
- Removed separate "遊び場を探す" button for simplified workflow
- Combined clothing and playground recommendations into single "服装・遊び場を提案する" action
- Playground suggestions now automatically appear when location data is available
- Reduced user interaction steps from 2 separate actions to 1 unified request
- July 07, 2025: Rebranded application to "おでよみ"
- Updated app name throughout the interface from "子供服装アドバイザー" to "おでよみ"
- Enhanced app description to clearly mention both clothing and playground recommendations
- Unified branding across header, navigation, footer, and documentation
- July 07, 2025: Significantly expanded playground database
- Added 20+ new playground venues across Tokyo area (parks, museums, malls, adventure centers)
- Expanded categories: outdoor parks, indoor facilities, educational venues, water parks, shopping malls
- Increased venue diversity: from basic 10 facilities to comprehensive 30+ options
- Enhanced location coverage: central Tokyo, suburbs, and seasonal/special venues
- July 07, 2025: Created Netlify-compatible version for free deployment
- Converted TypeScript to JavaScript (React/Node.js stack maintained)
- Migrated Express.js APIs to Netlify Functions (serverless)
- Added comprehensive UI component library in vanilla JavaScript
- Maintained all existing features: clothing recommendations, playground suggestions, weather integration
- Configured automatic deployment with netlify.toml
- Created complete documentation for Netlify deployment process
- July 08, 2025: Fixed JSX build issues and finalized Netlify deployment
- Resolved JSX syntax errors by changing file extensions from .js to .jsx for React components
- Updated Vite configuration for proper JSX handling in production builds
- Created comprehensive deployment documentation (DEPLOYMENT.md, CONTRIBUTING.md)
- Successfully tested production build process with Netlify-compatible configuration
- All features working: weather API, clothing recommendations, playground suggestions, responsive UI
- July 08, 2025: Complete modern UI redesign with glass morphism and advanced animations
- Implemented gradient mesh background with floating animations
- Added glass morphism effects with backdrop blur throughout the interface
- Created modern hero section with large typography and call-to-action buttons
- Enhanced form design with better spacing, typography, and visual hierarchy
- Updated color scheme to modern emerald/teal gradient with dark mode aesthetics
- Added smooth transitions and hover effects for interactive elements
- Improved button design with gradients, shadows, and scale transforms

## User Preferences

Preferred communication style: Simple, everyday language.