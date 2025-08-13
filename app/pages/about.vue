<template>
  <div class="container mx-auto px-4 py-8">
    <div class="max-w-4xl mx-auto">
      <!-- Page Header -->
      <div class="text-center mb-16">
        <h1 class="text-4xl font-bold text-highlighted mb-4">About Me</h1>
        <p class="text-xl text-muted">
          Learn more about my journey in developer relations and content creation
        </p>
      </div>

      <!-- Content placeholder -->
      <div class="prose prose-lg mx-auto">
        <div class="bg-elevated border border-default rounded-lg p-8">
          <h2 class="text-2xl font-semibold text-highlighted mb-4">Coming Soon</h2>
          <p class="text-muted">
            This page will contain detailed information about Tim Benniks' background, 
            experience, and passion for developer relations and content creation.
          </p>
          
          <div class="mt-8 flex justify-center">
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
    </div>
  </div>
</template>

<script setup>
useHead({
  title: 'About - Tim Benniks',
  meta: [
    { name: 'description', content: 'Learn more about Tim Benniks, Developer Relations Engineer and Content Creator.' }
  ]
})
</script>
