<template>
  <div class="min-h-screen bg-background transition-colors duration-300">
    <NuxtRouteAnnouncer />

    <!-- Header -->
    <AppHeader />

    <!-- Main content area -->
    <main class="flex-1">
      <slot />
    </main>

    <!-- Footer -->
    <AppFooter />
  </div>
</template>

<script setup>
// Optional: Add layout-specific logic here
useHead({
  htmlAttrs: {
    lang: "en",
  },
  meta: [{ name: "viewport", content: "width=device-width, initial-scale=1" }],
});
</script>
