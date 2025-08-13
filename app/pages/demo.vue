<template>
  <div>
    <!-- Hero Section with PageHeader -->
    <PageSection>
      <PageHeader
        title="Component Library Demo"
        description="Explore our component library built with Nuxt UI Pro composition patterns."
        :actions="[
          {
            label: 'View GitHub',
            variant: 'gradient',
            to: 'https://github.com/timbenniks/vibe-timbenniks',
            external: true
          },
          {
            label: 'Documentation',
            variant: 'outline',
            to: '/docs'
          }
        ]"
      />
    </PageSection>

    <!-- Feature Cards Section -->
    <PageSection
      title="Feature Components"
      subtitle="Composite components that extend Nuxt UI Pro with custom styling and behavior"
      layout="grid-3"
    >
      <FeatureCard
        icon="i-heroicons-code-bracket"
        title="Developer Experience"
        description="Built with TypeScript, Vue 3 Composition API, and modern tooling for the best developer experience."
        :actions="[
          { label: 'Learn More', variant: 'gradient' },
          { label: 'API Reference', variant: 'ghost' }
        ]"
      />
      
      <FeatureCard
        icon="i-heroicons-paint-brush"
        title="Beautiful Design"
        description="Carefully crafted components with attention to detail, accessibility, and responsive design."
        :actions="[
          { label: 'View Gallery', variant: 'gradient' },
          { label: 'Design System', variant: 'ghost' }
        ]"
      />
      
      <FeatureCard
        icon="i-heroicons-rocket-launch"
        title="High Performance"
        description="Optimized for speed with static generation, tree-shaking, and efficient bundle sizes."
        :actions="[
          { label: 'Benchmarks', variant: 'gradient' },
          { label: 'Optimization Guide', variant: 'ghost' }
        ]"
      />
    </PageSection>

    <!-- Button Variants Section -->
    <PageSection
      title="Custom Button Variants"
      subtitle="Extended Nuxt UI buttons with custom gradient variants"
    >
      <div class="flex flex-wrap gap-4 justify-center">
        <UButton variant="gradient">
          Gradient Button
        </UButton>
        <UButton variant="gradient-outline">
          Gradient Outline
        </UButton>
        <UButton variant="solid" color="primary">
          Primary Solid
        </UButton>
        <UButton variant="outline" color="primary">
          Primary Outline
        </UButton>
        <UButton variant="ghost" color="primary">
          Primary Ghost
        </UButton>
        <UButton variant="soft" color="primary">
          Primary Soft
        </UButton>
      </div>
    </PageSection>

    <!-- Card Variants Section -->
    <PageSection
      title="Custom Card Variants"
      subtitle="Extended UCard with gradient border effects"
      layout="grid-2"
    >
      <UCard>
        <template #header>
          <h3 class="text-lg font-semibold">Default Card</h3>
        </template>
        <p class="text-muted">This is a standard UCard with default styling from Nuxt UI Pro.</p>
        <template #footer>
          <UButton variant="outline" size="sm">Action</UButton>
        </template>
      </UCard>

      <UCard variant="gradient-border">
        <template #header>
          <h3 class="text-lg font-semibold">Gradient Border Card</h3>
        </template>
        <p class="text-muted">This card features our custom gradient-border variant with brand colors.</p>
        <template #footer>
          <UButton variant="gradient" size="sm">Action</UButton>
        </template>
      </UCard>
    </PageSection>

    <!-- Theme Toggle Section -->
    <PageSection
      title="Theme System"
      subtitle="Dynamic theme switching with smooth transitions"
    >
      <div class="text-center">
        <p class="text-muted mb-6">
          Our theme system adapts colors dynamically - blue primary in light mode, pink primary in dark mode.
        </p>
        <ThemeToggle />
      </div>
    </PageSection>
  </div>
</template>

<script setup>
// Page meta
useSeoMeta({
  title: 'Component Library Demo - Tim Benniks',
  description: 'Explore our component library built with Nuxt UI Pro composition patterns.',
  ogTitle: 'Component Library Demo - Tim Benniks',
  ogDescription: 'Explore our component library built with Nuxt UI Pro composition patterns.'
})
</script>
