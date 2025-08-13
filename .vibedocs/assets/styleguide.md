# Tim Benniks Design System & Style Guide

This styleguide provides comprehensive design and content guidelines for AI agents working on Tim Benniks' brand and website.

## Brand Overview

Tim Benniks is a Developer Experience Leader, Speaker, NuxtJS Ambassador, and Content Creator focused on developer relations, headless CMS technologies, and modern web development.

## Tailwind CSS v4 Configuration

This design system is built for Tailwind CSS version 4, utilizing modern CSS features like:

- **CSS Custom Properties**: All design tokens defined as CSS variables
- **Native CSS Nesting**: Improved component organization
- **Container Queries**: Responsive components based on container size
- **Modern Color Spaces**: Enhanced color management with oklch/oklab support
- **Improved Performance**: Zero-runtime with compile-time optimizations

### Design Tokens (CSS Custom Properties)

```css
@theme {
  /* Brand Colors */
  --color-brand-navy-deep: #1b1d39;
  --color-brand-navy-dark: #0e1029;
  --color-brand-black: #000000;
  --color-brand-white: #ffffff;

  /* Accent Colors */
  --color-accent-blue: #256ad1;
  --color-accent-pink: #d1258c;
  --color-accent-pink-soft: #db97bf;
  --color-accent-pink-bright: #ec4899;

  /* Neutral Colors */
  --color-neutral-light: #e2e8f0;
  --color-neutral-medium: #cbd5e1;
  --color-neutral-dark: #94a3b8;

  /* Gradients */
  --gradient-brand: linear-gradient(
    89.87deg,
    var(--color-accent-blue) 7.57%,
    var(--color-accent-pink) 95.58%
  );

  /* Typography */
  --font-family-primary: "Lato", "Trebuchet MS", sans-serif;
  --font-family-mono: ui-monospace, "SF Mono", Menlo, Monaco, Consolas,
    monospace;

  /* Spacing Scale */
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;
  --spacing-2xl: 3rem;
}
```

## Color Palette

### Primary Colors

- **Deep Navy Blue**: `#1b1d39` (rgb(27, 29, 57)) - Main background color
  - Tailwind v4: `bg-brand-navy-deep`, `text-brand-navy-deep`
- **Darker Navy**: `#0e1029` (rgb(14, 16, 41)) - Body background and card accents
  - Tailwind v4: `bg-brand-navy-dark`, `text-brand-navy-dark`
- **Pure Black**: `#000000` (rgb(0, 0, 0)) - Footer background and overlay elements
  - Tailwind v4: `bg-brand-black`, `text-brand-black`
- **Pure White**: `#ffffff` (rgb(255, 255, 255)) - Primary text color and accents
  - Tailwind v4: `bg-brand-white`, `text-brand-white`

### Accent Colors

- **Gradient Blue**: `#256ad1` - Primary gradient start (blue)
  - Tailwind v4: `bg-accent-blue`, `text-accent-blue`
- **Gradient Pink**: `#d1258c` - Primary gradient end (pink)
  - Tailwind v4: `bg-accent-pink`, `text-accent-pink`
- **Soft Pink**: `#db97bf` (rgb(219, 151, 191)) - Reading time indicators
  - Tailwind v4: `bg-accent-pink-soft`, `text-accent-pink-soft`
- **Bright Pink**: `#ec4899` (rgb(236, 72, 153)) - Theme color and accents
  - Tailwind v4: `bg-accent-pink-bright`, `text-accent-pink-bright`

### Neutral Colors

- **Light Gray**: `#e2e8f0` (rgb(226, 232, 240)) - text-slate-200
  - Tailwind v4: `bg-neutral-light`, `text-neutral-light`
- **Medium Gray**: `#cbd5e1` (rgb(203, 213, 225)) - text-slate-300
  - Tailwind v4: `bg-neutral-medium`, `text-neutral-medium`
- **Dark Gray**: `#94a3b8` (rgb(148, 163, 184)) - text-slate-400
  - Tailwind v4: `bg-neutral-dark`, `text-neutral-dark`

### Special Gradients

- **Primary Brand Gradient**: `linear-gradient(89.87deg, #256ad1 7.57%, #d1258c 95.58%)`
  - Tailwind v4: `bg-gradient-brand` (custom utility)
  - Used for titles, CTAs, borders, and special elements
  - Creates the signature blue-to-pink brand identity

### Gradient Utilities (Tailwind v4)

```css
@utility bg-gradient-brand {
  background: var(--gradient-brand);
}

@utility text-gradient-brand {
  background: var(--gradient-brand);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
}
```

## Typography

### Font Families (Tailwind v4 Configuration)

```css
@theme {
  --font-family-primary: "Lato", "Trebuchet MS", sans-serif;
  --font-family-mono: ui-monospace, "SF Mono", Menlo, Monaco, Consolas,
    "Liberation Mono", "Courier New", monospace;
}
```

- **Primary Font**: "Lato" with fallback "Trebuchet MS"
  - Tailwind v4: `font-primary`
- **System Fallback**: "Lato Fallback: Trebuchet MS"
- **Base Font**: "Trebuchet MS" (html/root default)
- **Monospace**: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace
  - Tailwind v4: `font-mono`

### Font Weights

- **Regular**: 400 (normal text) - `font-normal`
- **Bold**: 700 (headings, emphasized text) - `font-bold`
- **Black**: 900 (titles, important headings) - `font-black`

### Typography Scale

- **xs**: 0.75rem (12px) - Small labels - `text-xs`
- **sm**: 0.875rem (14px) - Meta information, descriptions - `text-sm`
- **base**: 1rem (16px) - Body text - `text-base`
- **lg**: 1.125rem (18px) - Large body text - `text-lg`
- **xl**: 1.25rem (20px) - Large text elements - `text-xl`
- **2xl**: 1.5rem (24px) - Section headings - `text-2xl`
- **3xl**: 1.875rem (30px) - Page titles - `text-3xl`
- **4xl**: 2.25rem (36px) - Large headings - `text-4xl`
- **5xl**: 3rem (48px) - Hero text (md screens) - `text-5xl`
- **7xl**: 4.5rem (72px) - Hero text (large screens) - `text-7xl`

### Typography Classes (Tailwind v4 Components)

```css
@component .title {
  @apply font-primary font-black uppercase text-gradient-brand;
}

@component .page-title {
  @apply text-4xl md:text-5xl font-bold text-brand-white;
}

@component .text-fancy-bg {
  @apply text-gradient-brand;
}

@component .tag {
  @apply text-xs uppercase font-bold bg-gradient-brand text-brand-white px-2 py-1 rounded;
}

@component .cta {
  @apply bg-brand-black text-brand-white font-bold uppercase text-center border border-accent-blue hover:opacity-80 transition-opacity;
}

@component .flowing-title {
  @apply text-gradient-brand;
}
```

- **`.title`**: Brand titles with gradient background, Lato font, 900 weight, uppercase
- **`.page-title`**: Large page headings
- **`.text-fancy-bg`**: Text with gradient background treatment
- **`.tag`**: Small uppercase labels with gradient background
- **`.cta`**: Call-to-action buttons with gradient borders
- **`.flowing-title`**: Gradient text effect (background-clip: text)

## Layout & Spacing

### Container (Tailwind v4)

```css
@theme {
  --max-width-container: 1400px;
  --breakpoint-sm: 640px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 1024px;
  --breakpoint-xl: 1280px;
  --breakpoint-2xl: 1536px;
}
```

- **Max Width**: 1400px - `max-w-[1400px]` or custom `max-w-container`
- **Responsive Breakpoints**:
  - sm: 640px - `sm:`
  - md: 768px - `md:`
  - lg: 1024px - `lg:`
  - xl: 1280px - `xl:`
  - 2xl: 1536px - `2xl:`

### Container Queries (Tailwind v4)

```css
@container-query {
  .card-grid {
    @container (min-width: 320px) {
      grid-template-columns: repeat(2, 1fr);
    }
    @container (min-width: 640px) {
      grid-template-columns: repeat(3, 1fr);
    }
  }
}
```

### Grid Systems

- **Standard Grid**: CSS Grid with responsive columns (1 → 2 → 3)
  - Tailwind v4: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
- **Media Grid**: Special layout for featured content
  - Tailwind v4: `grid grid-cols-[2fr_1fr] gap-6`
- **Flexbox**: Used for navigation and component layouts
  - Tailwind v4: `flex items-center justify-between`

### Spacing Scale (Tailwind v4)

```css
@theme {
  --spacing-xs: 0.25rem; /* 4px */
  --spacing-sm: 0.5rem; /* 8px */
  --spacing-md: 1rem; /* 16px */
  --spacing-lg: 1.5rem; /* 24px */
  --spacing-xl: 2rem; /* 32px */
  --spacing-2xl: 3rem; /* 48px */
}
```

- **0.25rem** (4px) - Fine adjustments - `p-1`, `m-1`, `gap-1`
- **0.5rem** (8px) - Small gaps - `p-2`, `m-2`, `gap-2`
- **1rem** (16px) - Standard spacing - `p-4`, `m-4`, `gap-4`
- **1.5rem** (24px) - Medium gaps - `p-6`, `m-6`, `gap-6`
- **2rem** (32px) - Large sections - `p-8`, `m-8`, `gap-8`
- **3rem** (48px) - Major sections - `p-12`, `m-12`, `gap-12`

## Components

### Navigation (Tailwind v4)

```css
@component .nav-header {
  @apply sticky top-0 z-50 backdrop-blur-md bg-brand-navy-deep/80;
}

@component .nav-item {
  @apply font-bold uppercase hover:opacity-80 transition-opacity;
}

@component .hamburger {
  @apply md:hidden flex flex-col gap-1;
}
```

- **Sticky Header**: `sticky top-0 z-50 backdrop-blur-md`
- **Background**: Semi-transparent with backdrop blur - `bg-brand-navy-deep/80`
- **Mobile**: Hamburger menu with animated lines
- **Font**: Bold, uppercase navigation items - `font-bold uppercase`

### Cards & Images (Tailwind v4)

```css
@component .fancy-image {
  @apply relative overflow-hidden rounded-lg border-2 border-transparent bg-gradient-brand p-1 hover:scale-105 transition-transform;

  & img {
    @apply rounded-md w-full h-full object-cover;
  }
}

@component .date-card {
  @apply bg-gradient-brand p-4 rounded-lg text-brand-white text-center;
}
```

- **`.fancy-image`**: Special border effect with gradient and hover animations
- **`.date-card`**: Event date display with gradient border
- **Aspect Ratios**: 16:9 for video thumbnails and featured images - `aspect-video`

### Buttons & CTAs (Tailwind v4)

```css
@component .btn-primary {
  @apply bg-brand-black text-brand-white font-bold uppercase text-center px-6 py-3 border border-accent-blue hover:opacity-80 transition-opacity rounded-md;
}

@component .btn-gradient {
  @apply bg-gradient-brand text-brand-white font-bold uppercase px-6 py-3 hover:opacity-90 transition-opacity rounded-md;
}
```

- **Primary CTA**: Black background with gradient border
- **Hover States**: Opacity changes (0.8-0.9) - `hover:opacity-80`
- **Typography**: Uppercase, bold, centered - `uppercase font-bold text-center`

### Content Areas (Tailwind v4)

```css
@component .prose-container {
  @apply prose prose-xl lg:prose-lg max-w-[65ch] text-brand-white;

  & h1,
  & h2,
  & h3 {
    @apply text-gradient-brand;
  }
  & a {
    @apply text-accent-blue hover:text-accent-pink transition-colors;
  }
}
```

- **Prose Styling**: Uses Tailwind typography plugin - `prose prose-xl lg:prose-lg`
- **Max Width**: 65ch for optimal reading - `max-w-[65ch]`
- **Prose Sizes**: prose-xl, lg:prose-lg for responsive typography

## Interactive Elements

### Hover Effects (Tailwind v4)

```css
@theme {
  --transition-fast: 0.15s cubic-bezier(0.4, 0, 0.2, 1);
  --transition-medium: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  --transition-slow: 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}
```

- **Links**: `hover:opacity-80 transition-opacity`
- **Images**: Special mask animations for `.fancy-image` - `hover:scale-105 transition-transform`
- **Buttons**: Slight opacity reduction - `hover:opacity-90 transition-opacity`

### Focus States (Tailwind v4)

```css
@component .focus-ring {
  @apply focus:outline-none focus:ring-2 focus:ring-accent-blue focus:ring-offset-2 focus:ring-offset-brand-navy-deep;
}
```

- **Outline**: Remove default, custom focus indicators - `focus:outline-none`
- **Ring**: Custom focus rings - `focus:ring-2 focus:ring-accent-blue`
- **Accessibility**: Maintain keyboard navigation support

### Transitions (Tailwind v4)

```css
@utility transition-fast {
  transition: all var(--transition-fast);
}

@utility transition-medium {
  transition: all var(--transition-medium);
}

@utility transition-slow {
  transition: all var(--transition-slow);
}
```

- **Duration**: 0.15s (fast), 0.3s (medium), 0.5s (slow)
- **Easing**: cubic-bezier(0.4, 0, 0.2, 1) - `ease-out`
- **Properties**: `transition-opacity`, `transition-transform`, `transition-colors`

## Content Guidelines

### Voice & Tone

- **Professional yet approachable**
- **Technical but accessible**
- **Confident and knowledgeable**
- **Community-focused**

### Content Types

- **Articles**: Technical insights, industry analysis
- **Videos**: Educational content, live streams
- **Speaking**: Conference talks, developer events
- **About**: Professional background and expertise

### Technical Focus Areas

- Developer Experience (DX)
- Headless CMS and JAMstack
- Modern web frameworks (Nuxt.js, Vue.js)
- Developer Relations and community building
- Performance and web standards

## Accessibility

### Color Contrast

- Maintain WCAG AA compliance
- High contrast between text and backgrounds
- Sufficient color differentiation

### Typography

- Minimum 16px base font size
- Clear hierarchy with appropriate size ratios
- Readable line heights (1.5-1.8)

### Navigation

- Keyboard accessible
- Screen reader friendly
- Clear focus indicators

## Usage Examples

### Headings (Tailwind v4)

```html
<h1 class="title">Primary Brand Title</h1>
<h2 class="page-title">Section Heading</h2>
<h3 class="text-fancy-bg">Gradient Text</h3>

<!-- With Tailwind utilities -->
<h1
  class="font-primary font-black uppercase text-gradient-brand text-4xl md:text-5xl"
>
  Brand Title
</h1>
<h2 class="text-3xl font-bold text-brand-white mb-6">Section Heading</h2>
```

### CTAs (Tailwind v4)

```html
<a href="#" class="cta">Call to Action</a>

<!-- With Tailwind utilities -->
<a href="#" class="btn-primary"> Primary CTA </a>
<button class="btn-gradient">Gradient Button</button>
```

### Layout Examples (Tailwind v4)

```html
<!-- Container with custom max-width -->
<div class="container mx-auto max-w-[1400px] px-4">
  <!-- Content -->
</div>

<!-- Responsive grid -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <!-- Grid items -->
</div>

<!-- Card with fancy image -->
<div class="fancy-image">
  <img src="image.jpg" alt="Description" class="aspect-video object-cover" />
</div>

<!-- Navigation header -->
<header class="nav-header">
  <nav class="container mx-auto flex items-center justify-between px-4 py-4">
    <!-- Navigation items -->
  </nav>
</header>
```

### Component Composition (Tailwind v4)

```html
<!-- Hero section -->
<section class="bg-brand-navy-deep text-brand-white py-20">
  <div class="container mx-auto max-w-[1400px] px-4">
    <h1 class="title text-7xl mb-6">Developer Experience Leader</h1>
    <p class="text-xl text-neutral-light max-w-2xl">
      Building better developer tools and experiences
    </p>
    <button class="btn-gradient mt-8">Get Started</button>
  </div>
</section>

<!-- Card grid -->
<section class="py-16 bg-brand-navy-dark">
  <div class="container mx-auto max-w-[1400px] px-4">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <article
        class="bg-brand-navy-deep rounded-lg p-6 border border-neutral-dark/20"
      >
        <h3 class="text-xl font-bold text-brand-white mb-4">Article Title</h3>
        <p class="text-neutral-light">Article description...</p>
        <span class="tag mt-4">Category</span>
      </article>
    </div>
  </div>
</section>
```

### Color Applications

- Use the signature gradient for brand elements, titles, and important CTAs
- Apply navy blues for backgrounds and containers
- Reserve white for primary text content
- Use gray shades for secondary information

### Layout Patterns

- Full-width hero sections with overlay text - `min-h-screen bg-brand-navy-deep`
- Card grids for content listings - `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`
- Two-column layouts for detailed content - `grid grid-cols-[2fr_1fr] gap-8`
- Centered containers with ample whitespace - `container mx-auto max-w-[1400px] px-4 py-16`

## Tailwind v4 Specific Features

### Modern CSS Support

- **Native CSS Nesting**: Use nested selectors within components
- **Container Queries**: Responsive components based on container size
- **CSS Custom Properties**: All design tokens as CSS variables
- **Modern Color Spaces**: Support for oklch and oklab color functions

### Performance Optimizations

- **Zero Runtime**: All styles compiled at build time
- **Smaller Bundle Size**: Only the CSS you use
- **Improved Tree Shaking**: Better dead code elimination
- **Lightning Fast Builds**: Optimized compilation process

### Migration from v3

```css
/* v3 syntax still supported */
@apply bg-blue-500 text-white;

/* v4 enhanced syntax */
@apply bg-accent-blue text-brand-white;

/* Custom properties integration */
background-color: var(--color-accent-blue);
```

### Advanced Utilities

```css
/* Container queries */
@container (min-width: 768px) {
  .card {
    @apply grid-cols-2;
  }
}

/* Custom utilities with CSS variables */
@utility bg-brand-gradient {
  background: var(--gradient-brand);
}

/* Component composition */
@component .hero-section {
  @apply bg-brand-navy-deep text-brand-white py-20;

  & .title {
    @apply text-gradient-brand text-7xl font-black;
  }
}
```

## Do's and Don'ts

### Do's

- ✅ Use the gradient for brand emphasis - `text-gradient-brand` or `bg-gradient-brand`
- ✅ Maintain consistent spacing patterns - Use spacing scale variables
- ✅ Keep typography hierarchy clear - Follow the defined text sizes
- ✅ Use appropriate image aspect ratios - `aspect-video`, `aspect-square`
- ✅ Follow the established color palette - Use custom color tokens
- ✅ Leverage Tailwind v4 features - Container queries, CSS nesting, custom properties
- ✅ Use semantic component classes - `@component` definitions for reusable patterns
- ✅ Implement proper focus states - `focus:ring-2 focus:ring-accent-blue`

### Don'ts

- ❌ Don't use colors outside the defined palette - Stick to custom color tokens
- ❌ Don't break the established typography scale - Use defined text sizes
- ❌ Don't ignore responsive design principles - Always consider mobile-first approach
- ❌ Don't compromise accessibility standards - Maintain proper contrast and focus states
- ❌ Don't overuse the gradient effect - Use sparingly for maximum impact
- ❌ Don't mix v3 and v4 syntax unnecessarily - Prefer v4 features when available
- ❌ Don't ignore container queries - Use them for component-based responsive design
- ❌ Don't hardcode values - Use design tokens and CSS custom properties

### Tailwind v4 Best Practices

- **Use @theme for design tokens**: Define all colors, fonts, and spacing as CSS custom properties
- **Leverage @component**: Create reusable component classes for complex patterns
- **Implement container queries**: Make components responsive based on their container
- **Utilize CSS nesting**: Organize component styles with proper nesting
- **Optimize for performance**: Take advantage of v4's zero-runtime compilation
