<template>
  <div class="min-h-screen bg-background transition-colors duration-300">
    <NuxtRouteAnnouncer />
    
    <!-- Header with theme toggle -->
    <header class="border-b border-default">
      <div class="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 class="text-xl font-bold text-highlighted">Tim Benniks</h1>
        <ThemeToggle />
      </div>
    </header>

    <!-- Main content -->
    <main class="container mx-auto px-4 py-8">
      <div class="text-center">
        <h2 class="text-3xl font-bold text-highlighted mb-4">Welcome to My Personal Website</h2>
        <p class="text-muted mb-8">A modern, accessible website built with Nuxt 4 and Nuxt UI Pro</p>
        
        <!-- Demo content to test themes -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div class="bg-elevated border border-default rounded-lg p-6">
            <h3 class="text-lg font-semibold text-highlighted mb-2">Light & Dark</h3>
            <p class="text-muted">Toggle between themes to see the smooth transition</p>
          </div>
          <div class="bg-elevated border border-default rounded-lg p-6">
            <h3 class="text-lg font-semibold text-highlighted mb-2">Nuxt UI Pro</h3>
            <p class="text-muted">Built with premium component library</p>
          </div>
          <div class="bg-elevated border border-default rounded-lg p-6">
            <h3 class="text-lg font-semibold text-highlighted mb-2">Custom Theme</h3>
            <p class="text-muted">Blue to pink gradient brand identity</p>
          </div>
        </div>

        <!-- Gradient demo -->
        <div class="mt-8 p-8 bg-gradient-to-r from-blue-500 to-pink-500 rounded-lg text-white">
          <h3 class="text-2xl font-bold mb-2">Brand Gradient</h3>
          <p>This demonstrates our custom blue-to-pink gradient theme</p>
        </div>
      </div>
    </main>
  </div>
</template>
