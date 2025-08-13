<template>
  <div class="container mx-auto px-4 py-8">
    <!-- Hero Section -->
    <section class="text-center py-16">
      <h1 class="text-5xl font-bold text-highlighted mb-6">
        Welcome to My <span class="text-brand">Digital Home</span>
      </h1>
      <p class="text-xl text-muted mb-8 max-w-3xl mx-auto">
        I'm Tim Benniks, a Developer Relations Engineer and Content Creator
        passionate about modern web development, headless CMS, and developer
        experience.
      </p>

      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <UButton
          to="/about"
          size="lg"
          icon="i-lucide-user"
          class="brand-gradient text-white"
        >
          Learn About Me
        </UButton>
        <UButton
          to="/articles"
          size="lg"
          color="neutral"
          variant="outline"
          icon="i-lucide-book-open"
        >
          Read My Articles
        </UButton>
      </div>
    </section>

    <!-- Features Grid -->
    <section class="py-16">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <div
          class="bg-elevated border border-default rounded-lg p-8 text-center hover:shadow-lg transition-shadow"
        >
          <div
            class="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <UIcon name="i-lucide-pen-tool" class="w-8 h-8 text-primary" />
          </div>
          <h3 class="text-xl font-semibold text-highlighted mb-4">
            Content Creation
          </h3>
          <p class="text-muted">
            Creating educational content about web development, JAMstack, and
            developer tools.
          </p>
        </div>

        <div
          class="bg-elevated border border-default rounded-lg p-8 text-center hover:shadow-lg transition-shadow"
        >
          <div
            class="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <UIcon name="i-lucide-mic" class="w-8 h-8 text-primary" />
          </div>
          <h3 class="text-xl font-semibold text-highlighted mb-4">Speaking</h3>
          <p class="text-muted">
            Speaking at conferences and events about modern web development and
            developer experience.
          </p>
        </div>

        <div
          class="bg-elevated border border-default rounded-lg p-8 text-center hover:shadow-lg transition-shadow"
        >
          <div
            class="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <UIcon name="i-lucide-code" class="w-8 h-8 text-primary" />
          </div>
          <h3 class="text-xl font-semibold text-highlighted mb-4">
            Development
          </h3>
          <p class="text-muted">
            Building modern web applications with focus on performance and
            developer experience.
          </p>
        </div>
      </div>
    </section>

    <!-- Brand Gradient Demo -->
    <section class="py-16">
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
    </section>
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
