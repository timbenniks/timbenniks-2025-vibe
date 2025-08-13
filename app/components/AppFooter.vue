<template>
  <footer class="bg-elevated border-t border-default mt-auto">
    <div class="container mx-auto px-4 py-8">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        
        <!-- Brand section -->
        <div class="md:col-span-2">
          <div class="flex items-center space-x-3 mb-4">
            <img 
              src="/tim.svg" 
              alt="Tim Benniks Logo" 
              class="w-10 h-10"
            >
            <span class="text-xl font-bold text-highlighted">Tim Benniks</span>
          </div>
          <p class="text-muted max-w-md">
            Developer Relations Engineer, Content Creator, and Speaker passionate about 
            modern web development, headless CMS, and developer experience.
          </p>
        </div>

        <!-- Quick Links -->
        <div>
          <h3 class="font-semibold text-highlighted mb-4">Quick Links</h3>
          <nav class="flex flex-col space-y-2">
            <NuxtLink
              v-for="link in quickLinks"
              :key="link.to"
              :to="link.to"
              class="text-muted hover:text-highlighted transition-colors text-sm"
            >
              {{ link.label }}
            </NuxtLink>
          </nav>
        </div>

        <!-- Social Links -->
        <div>
          <h3 class="font-semibold text-highlighted mb-4">Connect</h3>
          <div class="flex flex-col space-y-3">
            <a
              v-for="social in socialLinks"
              :key="social.name"
              :href="social.href"
              :aria-label="social.label"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center space-x-3 text-muted hover:text-highlighted transition-colors group"
            >
              <UIcon 
                :name="social.icon" 
                class="w-5 h-5 group-hover:scale-110 transition-transform" 
              />
              <span class="text-sm">{{ social.name }}</span>
            </a>
          </div>
        </div>
      </div>

      <!-- Bottom section -->
      <div class="border-t border-default mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center">
        <p class="text-muted text-sm">
          © {{ currentYear }} Tim Benniks. Built with 
          <a 
            href="https://nuxt.com" 
            target="_blank" 
            rel="noopener noreferrer"
            class="text-primary hover:underline"
          >
            Nuxt
          </a> 
          and 
          <a 
            href="https://ui.nuxt.com" 
            target="_blank" 
            rel="noopener noreferrer"
            class="text-primary hover:underline"
          >
            Nuxt UI Pro
          </a>.
        </p>
        
        <div class="flex items-center space-x-4 mt-4 sm:mt-0">
          <NuxtLink to="/privacy" class="text-muted hover:text-highlighted text-sm transition-colors">
            Privacy
          </NuxtLink>
          <NuxtLink to="/terms" class="text-muted hover:text-highlighted text-sm transition-colors">
            Terms
          </NuxtLink>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
const currentYear = new Date().getFullYear()

const quickLinks = [
  { label: 'About', to: '/about' },
  { label: 'Articles', to: '/articles' },
  { label: 'Videos', to: '/videos' },
  { label: 'Speaking', to: '/talks' },
  { label: 'Projects', to: '/projects' },
  { label: 'Contact', to: '/contact' }
]

const socialLinks = [
  {
    name: 'GitHub',
    href: 'https://github.com/timbenniks',
    icon: 'i-lucide-github',
    label: 'Follow on GitHub'
  },
  {
    name: 'Twitter',
    href: 'https://twitter.com/timbenniks',
    icon: 'i-lucide-twitter',
    label: 'Follow on Twitter'
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/in/timbenniks',
    icon: 'i-lucide-linkedin',
    label: 'Connect on LinkedIn'
  },
  {
    name: 'YouTube',
    href: 'https://youtube.com/@timbenniks',
    icon: 'i-lucide-youtube',
    label: 'Subscribe on YouTube'
  },
  {
    name: 'Twitch',
    href: 'https://twitch.tv/timbenniks',
    icon: 'i-lucide-twitch',
    label: 'Follow on Twitch'
  }
]
</script>
