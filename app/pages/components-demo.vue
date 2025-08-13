<template>
  <BaseContainer size="lg">
    <!-- Hero Section with new components -->
    <section class="text-center py-16">
      <BaseHeading tag="h1" color="gradient" class="mb-6">
        Welcome to My <span class="text-brand">Digital Home</span>
      </BaseHeading>
      <p class="text-xl text-muted mb-8 max-w-3xl mx-auto">
        I'm Tim Benniks, a Developer Relations Engineer and Content Creator passionate about 
        modern web development, headless CMS, and developer experience.
      </p>
      
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <BaseButton 
          to="/about" 
          size="lg" 
          variant="gradient"
          icon="i-lucide-user"
        >
          Learn About Me
        </BaseButton>
        <BaseButton 
          to="/articles" 
          size="lg" 
          color="neutral" 
          variant="outline"
          icon="i-lucide-book-open"
        >
          Read My Articles
        </BaseButton>
      </div>
    </section>

    <!-- Component Showcase Section -->
    <section class="py-16">
      <BaseHeading tag="h2" class="text-center mb-12">
        Component Library Showcase
      </BaseHeading>

      <!-- Button Variants -->
      <div class="mb-16">
        <BaseHeading tag="h3" size="xl" class="mb-6">Button Variants</BaseHeading>
        <BaseGrid :cols="{ default: 1, sm: 2, lg: 4 }" gap="md" class="mb-8">
          <BaseButton variant="gradient">Gradient Button</BaseButton>
          <BaseButton variant="gradient-outline">Gradient Outline</BaseButton>
          <BaseButton variant="solid" color="primary">Primary Solid</BaseButton>
          <BaseButton variant="outline" color="neutral">Neutral Outline</BaseButton>
        </BaseGrid>
      </div>

      <!-- Card Variants -->
      <div class="mb-16">
        <BaseHeading tag="h3" size="xl" class="mb-6">Card Components</BaseHeading>
        <BaseGrid :cols="{ default: 1, md: 2, lg: 3 }" gap="lg">
          <BaseCard 
            title="Default Card" 
            description="A standard card with border and background."
            variant="default"
          >
            <BaseButton variant="outline" size="sm">Learn More</BaseButton>
          </BaseCard>

          <BaseCard 
            title="Elevated Card" 
            description="Card with shadow effects and hover states."
            variant="elevated"
          >
            <BaseButton variant="gradient" size="sm">Get Started</BaseButton>
          </BaseCard>

          <BaseCard 
            title="Gradient Border" 
            description="Special card with animated gradient border on hover."
            variant="gradient-border"
          >
            <BaseButton variant="gradient-outline" size="sm">Explore</BaseButton>
          </BaseCard>
        </BaseGrid>
      </div>

      <!-- Typography Showcase -->
      <div class="mb-16">
        <BaseHeading tag="h3" size="xl" class="mb-6">Typography System</BaseHeading>
        <BaseCard variant="elevated" padding="lg">
          <BaseHeading tag="h1" class="mb-4">Heading 1 - Bold & Large</BaseHeading>
          <BaseHeading tag="h2" class="mb-4">Heading 2 - Bold & Medium</BaseHeading>
          <BaseHeading tag="h3" class="mb-4">Heading 3 - Semibold</BaseHeading>
          <BaseHeading tag="h4" color="muted" class="mb-4">Heading 4 - Muted Color</BaseHeading>
          <BaseHeading tag="h5" color="primary" class="mb-4">Heading 5 - Primary Color</BaseHeading>
          <BaseHeading tag="h6" color="gradient" class="mb-6">Heading 6 - Gradient Text</BaseHeading>
          
          <p class="text-muted mb-4">
            This is regular paragraph text with muted color. It demonstrates our typography 
            system with consistent spacing and readability.
          </p>
          <p class="text-highlighted">
            This paragraph uses highlighted text color for better emphasis and contrast.
          </p>
        </BaseCard>
      </div>

      <!-- Features Grid with New Components -->
      <div class="mb-16">
        <BaseHeading tag="h3" size="xl" class="mb-6">Feature Highlights</BaseHeading>
        <BaseGrid :cols="{ default: 1, md: 3 }" gap="lg">
          <BaseCard 
            variant="interactive"
            title="Content Creation"
            description="Creating educational content about web development, JAMstack, and developer tools."
            padding="lg"
          >
            <template #header>
              <div class="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <UIcon name="i-lucide-pen-tool" class="w-8 h-8 text-primary" />
              </div>
            </template>
          </BaseCard>

          <BaseCard 
            variant="interactive"
            title="Speaking"
            description="Speaking at conferences and events about modern web development and developer experience."
            padding="lg"
          >
            <template #header>
              <div class="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <UIcon name="i-lucide-mic" class="w-8 h-8 text-primary" />
              </div>
            </template>
          </BaseCard>

          <BaseCard 
            variant="interactive"
            title="Development"
            description="Building modern web applications with focus on performance and developer experience."
            padding="lg"
          >
            <template #header>
              <div class="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <UIcon name="i-lucide-code" class="w-8 h-8 text-primary" />
              </div>
            </template>
          </BaseCard>
        </BaseGrid>
      </div>

      <!-- Call to Action with Gradient -->
      <BaseCard variant="default" padding="xl" class="text-center brand-gradient text-white">
        <BaseHeading tag="h2" color="highlighted" class="text-white mb-4">
          Ready to Connect?
        </BaseHeading>
        <p class="text-xl mb-8 opacity-90">
          Let's discuss modern web development, headless CMS, or developer relations.
        </p>
        <BaseButton 
          to="/contact" 
          size="lg" 
          color="neutral" 
          variant="solid"
          icon="i-lucide-mail"
          class="bg-white text-gray-900 hover:bg-gray-100"
        >
          Get In Touch
        </BaseButton>
      </BaseCard>
    </section>
  </BaseContainer>
</template>

<script setup>
// SEO and meta
useHead({
  title: 'Tim Benniks - Developer Relations Engineer & Content Creator',
  meta: [
    { 
      name: 'description', 
      content: 'Developer Relations Engineer and Content Creator passionate about modern web development, headless CMS, and developer experience.' 
    },
    { property: 'og:title', content: 'Tim Benniks - Developer Relations Engineer & Content Creator' },
    { property: 'og:description', content: 'Developer Relations Engineer and Content Creator passionate about modern web development, headless CMS, and developer experience.' },
    { property: 'og:type', content: 'website' }
  ]
})
</script>
