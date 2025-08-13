<template>
  <div>
    <!-- Hero Section -->
    <PageSection>
      <PageHeader
        title="Tim Benniks"
        description="Developer Relations Engineer and Content Creator passionate about modern web development, headless CMS, and developer experience."
        :actions="[
          {
            label: 'Learn About Me',
            variant: 'gradient',
            to: '/about',
            icon: 'i-lucide-user',
          },
          {
            label: 'Read My Articles',
            variant: 'outline',
            to: '/articles',
            icon: 'i-lucide-book-open',
          },
        ]"
      />
    </PageSection>

    <!-- What I Do Section -->
    <PageSection
      title="What I Do"
      subtitle="Creating educational content, speaking at events, and building modern web applications"
      layout="grid-3"
    >
      <FeatureCard
        icon="i-lucide-pen-tool"
        title="Content Creation"
        description="Creating educational content about web development, JAMstack, and developer tools."
        :actions="[
          { label: 'View Content', variant: 'gradient', to: '/articles' },
        ]"
      />

      <FeatureCard
        icon="i-lucide-mic"
        title="Speaking"
        description="Speaking at conferences and events about modern web development and developer experience."
        :actions="[{ label: 'View Talks', variant: 'gradient', to: '/talks' }]"
      />

      <FeatureCard
        icon="i-lucide-code"
        title="Development"
        description="Building modern web applications with focus on performance and developer experience."
        :actions="[
          { label: 'See Projects', variant: 'gradient', to: '/projects' },
        ]"
      />
    </PageSection>

    <!-- CTA Section -->
    <PageSection>
      <div class="brand-gradient rounded-2xl p-12 text-center text-white">
        <h2 class="text-4xl font-bold mb-4">Ready to Connect?</h2>
        <p class="text-xl mb-8 opacity-90">
          Let's discuss modern web development, headless CMS, or developer
          relations.
        </p>
        <UButton
          to="/contact"
          size="lg"
          color="neutral"
          variant="solid"
          icon="i-lucide-mail"
        >
          Get In Touch
        </UButton>
      </div>
    </PageSection>
  </div>
</template>

<script setup>
// SEO and meta
useHead({
  title: "Tim Benniks - Developer Relations Engineer & Content Creator",
  meta: [
    {
      name: "description",
      content:
        "Developer Relations Engineer and Content Creator passionate about modern web development, headless CMS, and developer experience.",
    },
    {
      property: "og:title",
      content: "Tim Benniks - Developer Relations Engineer & Content Creator",
    },
    {
      property: "og:description",
      content:
        "Developer Relations Engineer and Content Creator passionate about modern web development, headless CMS, and developer experience.",
    },
    { property: "og:type", content: "website" },
  ],
});
</script>
