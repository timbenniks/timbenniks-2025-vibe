<template>
  <header
    class="sticky top-0 z-50 glass border-b border-default/50"
  >
    <div class="container mx-auto px-4">
      <div class="flex justify-between items-center py-4">
        <!-- Logo/Brand -->
        <NuxtLink
          to="/"
          class="flex items-center space-x-3 hover:opacity-80 transition-opacity"
        >
          <img
            src="/tim.svg"
            alt="Tim Benniks Logo"
            class="h-8 w-auto sm:h-10"
          />
          <span class="text-xl font-bold text-highlighted hidden sm:block"
            >Tim Benniks</span
          >
        </NuxtLink>

        <!-- Desktop Navigation -->
        <nav class="hidden md:flex items-center space-x-1">
          <NuxtLink
            v-for="item in navigation"
            :key="item.to"
            :to="item.to"
            class="px-3 py-2 rounded-md text-sm font-medium transition-colors"
            :class="[
              $route.path === item.to
                ? 'bg-primary/10 text-primary'
                : 'text-muted hover:text-highlighted hover:bg-elevated',
            ]"
          >
            {{ item.label }}
          </NuxtLink>
        </nav>

        <!-- Actions (Theme toggle + Mobile menu) -->
        <div class="flex items-center space-x-2">
          <ThemeToggle />

          <!-- Mobile menu button -->
          <UButton
            icon="i-lucide-menu"
            color="neutral"
            variant="ghost"
            size="md"
            class="md:hidden"
            :aria-label="isMenuOpen ? 'Close menu' : 'Open menu'"
            @click="isMenuOpen = !isMenuOpen"
          />
        </div>
      </div>

      <!-- Mobile Navigation -->
      <div
        v-if="isMenuOpen"
        class="md:hidden pb-4 border-t border-default mt-4 pt-4"
      >
        <nav class="flex flex-col space-y-2">
          <NuxtLink
            v-for="item in navigation"
            :key="item.to"
            :to="item.to"
            class="px-3 py-2 rounded-md text-sm font-medium transition-colors"
            :class="[
              $route.path === item.to
                ? 'bg-primary/10 text-primary'
                : 'text-muted hover:text-highlighted hover:bg-elevated',
            ]"
            @click="isMenuOpen = false"
          >
            {{ item.label }}
          </NuxtLink>
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup>
const isMenuOpen = ref(false);

// Close menu when route changes
const route = useRoute();
watch(
  () => route.path,
  () => {
    isMenuOpen.value = false;
  }
);

// Close menu when clicking outside (in a real app, you might want to use a composable for this)
onMounted(() => {
  const handleClickOutside = (event) => {
    if (isMenuOpen.value && !event.target.closest("header")) {
      isMenuOpen.value = false;
    }
  };
  document.addEventListener("click", handleClickOutside);
  onUnmounted(() => {
    document.removeEventListener("click", handleClickOutside);
  });
});

// Navigation items
const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Articles", href: "/articles" },
  { name: "Contact", href: "/contact" },
];
</script>
