<template>
  <div>
    <!-- Hero Section -->
    <PageSection>
      <PageHeader
        title="About Me"
        description="Learn more about my journey in developer relations, content creation, and building amazing web experiences"
        gradient
      />
    </PageSection>

    <!-- Main Content Section -->
    <PageSection>
      <div class="max-w-3xl mx-auto">
        <div class="glass floating p-12 rounded-2xl glow">
          <!-- Enhanced icon section -->
          <div class="text-center mb-8">
            <div
              class="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center relative"
            >
              <div
                class="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-full animate-pulse"
              />
              <UIcon
                name="i-lucide-user"
                class="w-12 h-12 text-primary relative z-10"
              />
            </div>

            <h2 class="text-3xl font-bold text-highlighted mb-4">
              Coming Soon
            </h2>
          </div>

          <div class="space-y-6 text-center">
            <p class="text-muted text-lg leading-relaxed">
              This page will contain detailed information about Tim Benniks'
              background, experience, and passion for developer relations and
              content creation.
            </p>

            <p class="text-muted leading-relaxed">
              You'll learn about his journey from developer to developer
              advocate, his work with leading companies, and his mission to
              improve developer experience across the web ecosystem.
            </p>

            <div class="pt-6">
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
        </div>
      </div>
    </PageSection>

    <!-- Skills Preview Section -->
    <PageSection
      title="Areas of Expertise"
      subtitle="Technologies and practices I'm passionate about"
      layout="grid-3"
    >
      <FeatureCard
        icon="i-lucide-globe"
        title="Modern Web Development"
        description="Vue.js, Nuxt, React, TypeScript, and cutting-edge web technologies."
        interactive
      />

      <FeatureCard
        icon="i-lucide-users"
        title="Developer Relations"
        description="Building communities, creating content, and improving developer experience."
        interactive
      />

      <FeatureCard
        icon="i-lucide-layers"
        title="Headless Architecture"
        description="JAMstack, serverless, and modern content management systems."
        interactive
      />
    </PageSection>
  </div>
</template>

<script setup>
useHead({
  title: "About - Tim Benniks",
  meta: [
    {
      name: "description",
      content:
        "Learn more about Tim Benniks, Developer Relations Engineer and Content Creator.",
    },
  ],
});
</script>
