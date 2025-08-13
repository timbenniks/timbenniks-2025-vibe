<template>
  <div>
    <!-- Hero Section -->
    <PageSection>
      <PageHeader
        title="Contact"
        description="Let's connect and discuss modern web development, speaking opportunities, or collaborations"
        gradient
      />
    </PageSection>

    <!-- Contact Section with enhanced styling -->
    <PageSection>
      <div class="max-w-2xl mx-auto">
        <div class="glass floating p-12 rounded-2xl text-center glow">
          <!-- Enhanced icon with gradient background -->
          <div class="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center relative">
            <div class="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-full animate-pulse" />
            <UIcon
              name="i-lucide-mail"
              class="w-12 h-12 text-primary relative z-10"
            />
          </div>
          
          <h2 class="text-3xl font-bold text-highlighted mb-4">
            Get In Touch
          </h2>
          <p class="text-muted mb-8 text-lg leading-relaxed">
            I'm always excited to connect with fellow developers, discuss speaking opportunities, 
            or explore potential collaborations. Contact form and details will be available here soon.
          </p>
          
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <UButton
              to="/"
              variant="gradient-outline"
              size="lg"
              icon="i-lucide-arrow-left"
              class="glow-hover"
            >
              Back to Home
            </UButton>
            <UButton
              to="/about"
              variant="ghost"
              size="lg"
              icon="i-lucide-user"
            >
              Learn More About Me
            </UButton>
          </div>
        </div>
      </div>
    </PageSection>

    <!-- Contact Methods Preview -->
    <PageSection
      title="Ways to Connect"
      subtitle="Choose your preferred method of communication"
      layout="grid-3"
    >
      <FeatureCard
        icon="i-lucide-linkedin"
        title="LinkedIn"
        description="Connect with me on LinkedIn for professional networking and industry discussions."
        interactive
      />
      
      <FeatureCard
        icon="i-lucide-twitter"
        title="Twitter/X"
        description="Follow me for real-time thoughts on web development, tech trends, and industry insights."
        interactive
      />
      
      <FeatureCard
        icon="i-lucide-github"
        title="GitHub"
        description="Explore my open-source contributions and collaborate on exciting projects."
        interactive
      />
    </PageSection>
  </div>
</template>

<script setup>
useHead({
  title: "Contact - Tim Benniks",
  meta: [
    {
      name: "description",
      content:
        "Get in touch with Tim Benniks for speaking opportunities, collaborations, or questions.",
    },
  ],
});
</script>
