<template>
  <div
    class="min-h-screen bg-background transition-colors duration-300 relative overflow-hidden"
  >
    <!-- Animated background elements -->
    <div class="fixed inset-0 -z-10">
      <!-- Subtle animated gradient overlay -->
      <div class="absolute inset-0 bg-subtle opacity-50" />

      <!-- Floating geometric shapes -->
      <div
        class="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-gradient-to-r from-blue-500/5 to-pink-500/5 blur-3xl animate-pulse"
      />
      <div
        class="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-gradient-to-r from-pink-500/5 to-blue-500/5 blur-3xl animate-pulse delay-1000"
      />
      <div
        class="absolute top-3/4 left-1/2 w-64 h-64 rounded-full bg-gradient-to-r from-blue-500/3 to-pink-500/3 blur-3xl animate-pulse delay-2000"
      />
    </div>

    <NuxtRouteAnnouncer />

    <!-- Header -->
    <AppHeader />

    <!-- Main content area -->
    <main class="flex-1 relative z-10">
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
