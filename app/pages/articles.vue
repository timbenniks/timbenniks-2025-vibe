<template>
  <div>
    <!-- Hero Section with enhanced PageHeader -->
    <PageSection>
      <PageHeader
        title="Articles"
        description="Insights on web development, JAMstack, and developer experience"
        gradient
      />
    </PageSection>

    <!-- Coming Soon Section with glass effect -->
    <PageSection>
      <div class="max-w-2xl mx-auto">
        <div class="glass floating p-12 rounded-2xl text-center glow">
          <!-- Icon with gradient background -->
          <div
            class="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center relative"
          >
            <div
              class="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-full animate-pulse"
            />
            <UIcon
              name="i-lucide-book-open"
              class="w-12 h-12 text-primary relative z-10"
            />
          </div>

          <!-- Enhanced typography -->
          <h2 class="text-3xl font-bold text-highlighted mb-4">Coming Soon</h2>
          <p class="text-muted mb-8 text-lg leading-relaxed">
            This page will showcase Tim's articles and blog posts about modern
            web development, headless CMS, JAMstack architecture, and developer
            experience insights.
          </p>

          <!-- Enhanced button with better styling -->
          <UButton
            to="/"
            variant="gradient-outline"
            size="lg"
            icon="i-lucide-arrow-left"
            class="glow-hover"
          >
            Back to Home
          </UButton>
        </div>
      </div>
    </PageSection>

    <!-- Preview section for future content -->
    <PageSection
      title="What's Coming"
      subtitle="A preview of the content categories you'll find here"
      layout="grid-3"
    >
      <FeatureCard
        icon="i-lucide-layers"
        title="JAMstack Architecture"
        description="Deep dives into modern web architecture patterns, static site generation, and serverless deployment strategies."
        interactive
      />

      <FeatureCard
        icon="i-lucide-zap"
        title="Developer Experience"
        description="Best practices for improving developer workflows, tooling, and creating better development environments."
        interactive
      />

      <FeatureCard
        icon="i-lucide-rocket"
        title="Performance & Optimization"
        description="Techniques for building fast, efficient web applications with optimal user experience and Core Web Vitals."
        interactive
      />
    </PageSection>
  </div>
</template>

<script setup>
useHead({
  title: "Articles - Tim Benniks",
  meta: [
    {
      name: "description",
      content:
        "Articles and blog posts by Tim Benniks on web development and developer experience.",
    },
  ],
});
</script>
