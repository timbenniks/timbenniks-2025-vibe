# Product Implementation Plan

This document defines how the product will be built and when.

## Section Explanations

| Section               | Overview                                                                                          |
| --------------------- | ------------------------------------------------------------------------------------------------- |
| Overview              | A brief recap of what we're building and the current state of the PRD.                            |
| Architecture          | High-level technical decisions and structure (e.g., frontend/backend split, frameworks, storage). |
| Components            | Major parts of the system and their roles. Think modular: what pieces are needed to make it work. |
| Data Model            | What data structures or models are needed. Keep it conceptual unless structure is critical.       |
| Major Technical Steps | High-level implementation tasks that guide development. Not detailed coding steps.                |
| Tools & Services      | External tools, APIs, libraries, or platforms this app will depend on.                            |
| Risks & Unknowns      | Technical or project-related risks, open questions, or blockers that need attention.              |
| Milestones            | Key implementation checkpoints or phases to show progress.                                        |
| Environment Setup     | Prerequisites or steps to get the app running in a local/dev environment.                         |

## Overview

We are implementing a modern, high-performance personal website for Tim Benniks using Nuxt 4 and Nuxt UI Pro. The PRD has been completed and approved, outlining a professional showcase platform with 9 core pages, dark/light mode theming, lightweight YouTube embedding, and content filtering capabilities. The site will use Tim Benniks MCP for content data, rendered statically for optimal performance, with a future migration path to Contentstack CMS.

## Architecture

### Frontend Architecture

- **Framework**: Nuxt 4 (Vue.js meta-framework) with Universal rendering (SSG/SSR hybrid)
- **UI Library**: Nuxt UI Pro (licensed premium component library)
- **Styling**: Tailwind CSS with custom theme configuration based on styleguide.md
- **Component Strategy**: Composition API with TypeScript for type safety
- **State Management**: Nuxt's built-in state management (no external store needed for static content)

### Content Strategy

- **Phase 1**: Static Site Generation (SSG) with content from Tim Benniks MCP
- **Data Flow**: MCP → Static JSON → Nuxt pages (build-time content injection)
- **Phase 2**: Dynamic content via Contentstack Headless CMS (future implementation)

### Deployment Architecture

- **Hosting**: Vercel or Netlify (JAMstack optimized)
- **CDN**: Automatic edge distribution with hosting platform
- **Domain**: Custom domain with SSL/TLS
- **Performance**: Static assets optimization, image optimization, lazy loading

### Theming Architecture

- **Dark/Light Mode**: Nuxt Color Mode module with system preference detection
- **CSS Architecture**: CSS custom properties with Tailwind CSS integration
- **Design System**: Component-based theming with Nuxt UI Pro configuration
- **Brand Colors**: Blue-to-pink gradient system as defined in styleguide.md

## Components

### Core Application Components

- **App Shell**: Main layout with navigation, header, footer, and theme toggle
- **Navigation System**: Responsive navigation with mobile hamburger menu
- **Theme Provider**: Dark/light mode management with preference persistence
- **Content Layout**: Reusable page layouts for different content types

### Content Display Components

- **Hero Section**: Homepage hero with professional introduction and featured content
- **Video Player**: Lightweight YouTube embedding component with lazy loading
- **Content Grid**: Responsive grid system for videos, articles, and talks
- **Content Filter**: Taxonomy-based filtering system for content organization
- **Timeline Component**: Career history and speaking engagement timeline
- **Profile Card**: About section with professional information

### Component Architecture Guidelines

**Page-Component Separation Strategy**: To facilitate future CMS migration, pages should remain simple layout containers while all content logic lives in reusable Vue components.

- **Pages (`app/pages/`)**: Simple containers that import and arrange components

  ```vue
  <!-- Example: pages/index.vue -->
  <template>
    <div>
      <HeroSection />
      <FeaturedContent />
      <AboutPreview />
    </div>
  </template>
  ```

- **Components (`app/components/`)**: All content rendering, data fetching, and business logic
  ```vue
  <!-- Example: components/HeroSection.vue -->
  <template>
    <section class="hero">
      <!-- Hero content with data binding -->
    </section>
  </template>
  ```

**Benefits for CMS Migration**:

- Components can easily switch from static data to CMS API calls
- Page layouts remain unchanged during content source transitions
- Individual components can be migrated incrementally
- Easier A/B testing and content variations
- Better component reusability across different page types

### UI Components (Nuxt UI Pro)

- **Button System**: Primary, secondary, and gradient buttons with animations
- **Card Components**: Content cards with hover effects and gradient borders
- **Form Elements**: Contact and newsletter signup forms (future enhancement)
- **Modal System**: Image galleries and video overlays
- **Navigation Components**: Menu, breadcrumbs, and pagination

### Custom Components

- **Gradient Text**: Brand gradient text effects for titles and CTAs
- **Parallax Elements**: Subtle parallax effects for visual interest
- **Social Links**: Professional social media integration
- **Press Kit**: Downloadable resources and media materials

## Data Model

### Content Types

```typescript
interface VideoContent {
  id: string;
  title: string;
  description: string;
  youtubeId: string;
  thumbnailUrl: string;
  category:
    | "personal"
    | "contentstack"
    | "hygraph"
    | "uniform"
    | "headless-creator"
    | "middleware";
  publishedAt: string;
  tags: string[];
  duration: string;
}

interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  slug: string;
  publishedAt: string;
  readingTime: number;
  tags: string[];
  featuredImage?: string;
}

interface Talk {
  id: string;
  title: string;
  conference: string;
  location: string;
  date: string;
  description: string;
  slides?: string;
  video?: string;
  type: "conference" | "meetup" | "podcast" | "webinar";
}

interface CareerEntry {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate?: string;
  location: string;
  description: string;
  logoUrl?: string;
  websiteUrl?: string;
}
```

### Page Data Structure

- **Static Pages**: About, Uses, Press Kit with markdown content
- **Dynamic Lists**: Videos, Articles, Speaking with filtering and pagination
- **Aggregated Data**: Homepage with featured content from multiple sources
- **Navigation Data**: Menu structure with page hierarchy

### Theme Configuration

- **Color Tokens**: CSS custom properties for brand colors and gradients
- **Typography Scale**: Font sizes, weights, and line heights
- **Spacing System**: Consistent spacing scale throughout components
- **Breakpoint System**: Responsive design breakpoints

## Major Technical Steps

### Phase 1: Foundation Setup (Week 1)

- **Initialize Nuxt 4 Project**: Create new project with TypeScript configuration
- **Install Nuxt UI Pro**: Set up licensed UI library with custom theme
- **Configure Tailwind**: Implement custom design system from styleguide.md
- **Set Up Development Environment**: ESLint, Prettier, and development tools

### Phase 2: Core Architecture (Week 1-2)

- **Implement Theme System**: Dark/light mode with Nuxt Color Mode
- **Create App Shell**: Main layout, navigation, and responsive structure
- **Build Component Library**: Core reusable components based on design system
- **Set Up Content Pipeline**: Tim Benniks MCP integration for content fetching

### Phase 3: Content Implementation (Week 2-3)

- **Homepage Development**: Hero section, featured content, and call-to-actions
- **About Page**: Professional bio, career timeline, and FAQ section
- **Video Gallery**: Categorized video display with YouTube embedding
- **Articles Section**: Blog-style content with reading experience

### Phase 4: Interactive Features (Week 3-4)

- **Content Filtering**: Taxonomy-based filtering for videos, articles, talks
- **Search Functionality**: Basic search across content types
- **Speaking Section**: Conference talks timeline and speaking information
- **Press Kit Page**: Professional materials and downloadable resources

### Phase 5: Performance & Polish (Week 4)

- **Performance Optimization**: Image optimization, lazy loading, bundle analysis
- **Accessibility Audit**: WCAG 2.1 AA compliance verification
- **Animation Implementation**: Parallax effects, hover animations, smooth scrolling
- **SEO Optimization**: Meta tags, structured data, sitemap generation

### Phase 6: Deployment & Testing (Week 4)

- **Production Build**: Optimize for deployment with static generation
- **Hosting Setup**: Deploy to Vercel/Netlify with custom domain
- **Performance Testing**: Lighthouse audits and optimization
- **Cross-browser Testing**: Ensure compatibility across modern browsers

## Tools & Services

### Development Tools

- **Framework**: Nuxt 4 with Vue 3 Composition API
- **UI Library**: Nuxt UI Pro (licensed)
- **Styling**: Tailwind CSS with custom configuration
- **Language**: TypeScript for type safety
- **Package Manager**: npm for dependency management

### Content & Data

- **Content Source**: Tim Benniks MCP for structured content
- **Image Hosting**: Cloudinary for optimized image delivery
- **Font Loading**: Google Fonts (Lato) or local hosting for performance
- **Icon System**: Nuxt Icon with Heroicons/Phosphor icons

### Development Environment

- **Code Editor**: Visual Studio Code with Vue/Nuxt extensions
- **Version Control**: Git with conventional commits
- **Code Quality**: ESLint, Prettier, TypeScript compiler
- **Testing**: Vitest for unit testing, Playwright for E2E testing

### Deployment & Hosting

- **Hosting Platform**: Vercel (primary) or Netlify (alternative)
- **Domain**: Custom domain with SSL/TLS
- **CDN**: Global edge distribution with hosting platform
- **Analytics**: Vercel Analytics or Google Analytics for insights

### Performance & Monitoring

- **Performance**: Lighthouse CI for continuous monitoring
- **Error Tracking**: Optional error monitoring service
- **Uptime Monitoring**: Basic uptime checks
- **SEO Tools**: Google Search Console integration

## Risks & Unknowns

### Technical Risks

- **Nuxt 4 Stability**: Framework is in release candidate phase, potential breaking changes
- **Tim Benniks MCP Reliability**: Dependency on external MCP service availability
- **Performance with Large Content**: Handling hundreds of videos and articles efficiently
- **Image Optimization**: Managing large media assets without performance impact

### Content Risks

- **Data Structure Changes**: MCP content structure modifications requiring code updates
- **Content Volume**: Managing large amounts of historical content and media
- **YouTube API Limits**: Potential rate limiting with video thumbnail generation
- **Brand Asset Quality**: Ensuring all images and media are high-resolution and optimized

### Deployment Risks

- **Domain Migration**: Potential SEO impact from domain changes
- **SSL/TLS Configuration**: Ensuring proper security certificate setup
- **CDN Configuration**: Optimizing global content delivery
- **Backup Strategy**: Content and configuration backup procedures

### Future Migration Risks

- **Contentstack Integration**: Complexity of migrating from static to dynamic content
- **Data Migration**: Ensuring content integrity during CMS transition
- **API Integration**: Contentstack SDK setup and live preview implementation
- **Performance Impact**: Maintaining performance with dynamic content loading

## Milestones

### Milestone 1: Foundation Complete (End of Week 1)

- ✅ Nuxt 4 project initialized with TypeScript
- ✅ Nuxt UI Pro installed and configured
- ✅ Custom theme implemented from styleguide.md
- ✅ Development environment fully configured
- ✅ Core app shell and navigation implemented

### Milestone 2: Core Pages Functional (End of Week 2)

- ✅ Homepage with hero and featured content
- ✅ About page with career timeline
- ✅ Dark/light mode fully functional
- ✅ Tim Benniks MCP integration complete
- ✅ Core component library established

### Milestone 3: Content Features Complete (End of Week 3)

- ✅ Video gallery with categories and YouTube embedding
- ✅ Articles section with reading experience
- ✅ Speaking page with talks timeline
- ✅ Content filtering and search functionality
- ✅ Press kit and uses pages implemented

### Milestone 4: Production Ready (End of Week 4)

- ✅ Performance optimization complete (Lighthouse 95+)
- ✅ Accessibility audit passed (WCAG 2.1 AA)
- ✅ All animations and interactions polished
- ✅ SEO optimization and structured data implemented
- ✅ Cross-browser testing completed

### Milestone 5: Live Deployment (Week 4)

- ✅ Production build optimized and tested
- ✅ Hosting platform configured with custom domain
- ✅ SSL/TLS and CDN properly configured
- ✅ Performance monitoring and analytics set up
- ✅ Documentation and handoff complete

## Environment Setup

### Prerequisites

- **Node.js**: Version 18+ (recommended: latest LTS)
- **Package Manager**: npm
- **Code Editor**: Visual Studio Code with recommended extensions
- **Git**: Version control with GitHub repository access

### Development Environment Setup

1. **Project Initialization**

   ```bash
   # Clone or create new Nuxt 4 project
   npx nuxi@latest init tim-benniks-website
   cd tim-benniks-website

   # Install dependencies
   npm install
   ```

2. **Nuxt UI Pro Installation**

   ```bash
   # Install Nuxt UI Pro (requires license)
   npm add @nuxt/ui-pro

   # Install dependencies
   npm add @nuxt/ui @nuxt/color-mode @nuxtjs/tailwindcss
   ```

3. **Development Configuration**

   ```bash
   # Install development tools
   npm add -D @nuxt/eslint-config @nuxt/typescript eslint prettier

   # Install testing framework
   npm add -D vitest @vue/test-utils
   ```

4. **Environment Variables**

   ```bash
   # Create .env file
   touch .env

   # Add required environment variables
   echo "NUXT_UI_PRO_LICENSE=your-license-key" >> .env
   ```

5. **Start Development Server**
   ```bash
   npm run dev
   ```

### Recommended VS Code Extensions

- **Vue Language Features (Volar)**: Vue 3 and TypeScript support
- **Nuxt**: Official Nuxt development tools
- **Tailwind CSS IntelliSense**: CSS class autocomplete
- **ESLint**: Code linting and formatting
- **Prettier**: Code formatting
- **Auto Rename Tag**: HTML/Vue tag synchronization

### Project Structure

```
tim-benniks-website/
├── .nuxt/                 # Build artifacts (auto-generated)
├── .output/               # Production build output
├── app/                   # Main application directory (new in Nuxt 4)
│   ├── assets/           # Stylesheets, images, fonts
│   ├── components/       # Vue components
│   ├── composables/      # Composable functions
│   ├── layouts/          # Page layouts
│   ├── middleware/       # Route middleware
│   ├── pages/            # Route pages
│   ├── plugins/          # Nuxt plugins
│   ├── utils/            # Utility functions
│   ├── app.config.ts     # App configuration
│   ├── app.vue           # Root application component
│   └── router.options.ts # Router configuration
├── content/              # Static content files (if using @nuxt/content)
├── layers/               # Nuxt layers
├── modules/              # Local modules
├── public/               # Static assets
├── server/               # Server-side code
│   ├── api/             # API routes
│   ├── middleware/      # Server middleware
│   ├── plugins/         # Server plugins
│   ├── routes/          # Server routes
│   └── utils/           # Server utilities
├── shared/               # Shared code across client/server
├── nuxt.config.ts        # Nuxt configuration
├── tailwind.config.ts    # Tailwind configuration
└── package.json          # Dependencies and scripts
```

### Development Workflow

1. **Feature Development**: Create feature branches for new functionality
2. **Code Quality**: Run ESLint and Prettier before commits
3. **Testing**: Write unit tests for complex components and utilities
4. **Performance**: Regular Lighthouse audits during development
5. **Documentation**: Update README and component documentation
