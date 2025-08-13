<template>
  <div class="container mx-auto px-4 py-8">
    <div class="max-w-4xl mx-auto text-center">
      <h1 class="text-4xl font-bold text-highlighted mb-4">Articles</h1>
      <p class="text-xl text-muted mb-8">
        Insights on web development, JAMstack, and developer experience
      </p>

      <div class="bg-elevated border border-default rounded-lg p-8">
        <UIcon
          name="i-lucide-book-open"
          class="w-16 h-16 text-primary mx-auto mb-4"
        />
        <h2 class="text-2xl font-semibold text-highlighted mb-4">
          Coming Soon
        </h2>
        <p class="text-muted mb-6">
          This page will showcase Tim's articles and blog posts about modern web
          development.
        </p>
        <UButton
          to="/"
          color="neutral"
          variant="outline"
          icon="i-lucide-arrow-left"
        >
          Back to Home
        </UButton>
      </div>
    </div>
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
