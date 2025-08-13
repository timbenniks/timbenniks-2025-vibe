<template>
  <div class="container mx-auto px-4 py-8">
    <div class="max-w-4xl mx-auto text-center">
      <h1 class="text-4xl font-bold text-highlighted mb-4">Contact</h1>
      <p class="text-xl text-muted mb-8">
        Let's connect and discuss modern web development
      </p>

      <div class="bg-elevated border border-default rounded-lg p-8">
        <UIcon
          name="i-lucide-mail"
          class="w-16 h-16 text-primary mx-auto mb-4"
        />
        <h2 class="text-2xl font-semibold text-highlighted mb-4">
          Get In Touch
        </h2>
        <p class="text-muted mb-6">
          Contact form and details will be available here soon.
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
