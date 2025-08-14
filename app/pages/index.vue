<template>
  <div>
    <!-- Hero Section -->
    <PageSection>
      <PageHeader
        :title="`${aboutData?.bio ? 'Tim Benniks' : 'Tim Benniks'}`"
        :description="
          aboutData?.bio ||
          'Developer Relations Engineer and Content Creator passionate about modern web development, headless CMS, and developer experience.'
        "
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

    <!-- Featured Articles Section -->
    <PageSection
      v-if="featuredArticles.length > 0"
      title="Featured Articles"
      subtitle="Latest insights on developer experience and modern web development"
      layout="grid-2"
    >
      <UCard
        v-for="article in featuredArticles"
        :key="article.slug"
        class="glass hover:glow transition-all duration-300"
      >
        <template #header>
          <div class="flex items-center gap-2 text-sm text-gray-400">
            <UIcon name="i-lucide-calendar" class="w-4 h-4" />
            <span>{{ formatDate(article.date) }}</span>
            <span>•</span>
            <UIcon name="i-lucide-clock" class="w-4 h-4" />
            <span>{{ article.readingTime }}</span>
          </div>
        </template>

        <div class="space-y-4">
          <h3 class="text-xl font-semibold">{{ article.title }}</h3>
          <p class="text-gray-300 leading-relaxed">{{ article.excerpt }}</p>
          <div class="flex flex-wrap gap-2">
            <UBadge
              v-for="tag in article.tags.slice(0, 3)"
              :key="tag"
              variant="soft"
              color="primary"
              size="xs"
            >
              {{ tag }}
            </UBadge>
          </div>
        </div>

        <template #footer>
          <UButton
            :to="`/articles/${article.slug}`"
            variant="ghost"
            icon="i-lucide-arrow-right"
            trailing
          >
            Read Article
          </UButton>
        </template>
      </UCard>
    </PageSection>

    <!-- Latest Videos Section -->
    <PageSection
      v-if="latestVideos.length > 0"
      title="Latest Videos"
      subtitle="Recent content from my YouTube channel and live streams"
      layout="grid-3"
    >
      <UCard
        v-for="video in latestVideos"
        :key="video.videoId"
        class="glass hover:glow transition-all duration-300"
      >
        <template #header>
          <div class="aspect-video bg-gray-800 rounded-lg overflow-hidden">
            <img
              :src="video.thumbnail"
              :alt="video.title"
              class="w-full h-full object-cover"
            />
          </div>
        </template>

        <div class="space-y-3">
          <h4 class="font-medium text-sm leading-tight">{{ video.title }}</h4>
          <div class="flex items-center gap-2 text-xs text-gray-400">
            <UIcon name="i-lucide-calendar" class="w-3 h-3" />
            <span>{{ formatDate(video.date) }}</span>
            <span>•</span>
            <UIcon name="i-lucide-clock" class="w-3 h-3" />
            <span>{{ video.duration }}</span>
          </div>
          <div class="flex flex-wrap gap-1">
            <UBadge
              v-for="tag in video.tags.slice(0, 2)"
              :key="tag"
              variant="soft"
              color="secondary"
              size="xs"
            >
              {{ tag }}
            </UBadge>
          </div>
        </div>

        <template #footer>
          <UButton
            :to="`https://youtube.com/watch?v=${video.videoId}`"
            target="_blank"
            variant="ghost"
            icon="i-lucide-external-link"
            trailing
          >
            Watch Video
          </UButton>
        </template>
      </UCard>
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

<script setup lang="ts">
import type { AboutData, Article, Video } from "~/types/content";

// Fetch data from static JSON files using useLazyFetch
const { data: aboutData } = await useLazyFetch<AboutData>("/data/about.json", {
  server: false,
});

const { data: articlesData } = await useLazyFetch<Article[]>(
  "/data/articles.json",
  {
    server: false,
  }
);

const { data: videosData } = await useLazyFetch<Video[]>("/data/videos.json", {
  server: false,
});

// Process data
const featuredArticles = computed(() => {
  if (!articlesData.value || !Array.isArray(articlesData.value)) return [];
  return articlesData.value.filter((article) => article.featured).slice(0, 2);
});

const latestVideos = computed(() => {
  if (!videosData.value || !Array.isArray(videosData.value)) return [];
  return videosData.value.slice(0, 3);
});

// Utility function to format dates
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// SEO and meta
useHead({
  title: "Tim Benniks - Developer Experience Lead & Content Creator",
  meta: [
    {
      name: "description",
      content:
        aboutData.value?.bio ||
        "Developer Experience Lead and Content Creator passionate about modern web development, headless CMS, and developer experience.",
    },
    {
      property: "og:title",
      content: "Tim Benniks - Developer Experience Lead & Content Creator",
    },
    {
      property: "og:description",
      content:
        aboutData.value?.bio ||
        "Developer Experience Lead and Content Creator passionate about modern web development, headless CMS, and developer experience.",
    },
    { property: "og:type", content: "website" },
  ],
});
</script>
