<template>
  <UContainer :size="containerSize" class="text-center py-16 relative">
    <!-- Background glow effect -->
    <div class="absolute inset-0 -z-10">
      <div
        class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-32 bg-gradient-to-r from-primary/10 to-primary/5 blur-3xl rounded-full opacity-60"
      />
    </div>

    <!-- Main heading with enhanced styling -->
    <h1
      :class="[
        'font-bold mb-6 relative',
        headingSize === 'xl' ? 'text-5xl md:text-6xl' : 'text-4xl md:text-5xl',
        gradient ? 'text-brand' : 'text-highlighted',
        'transform transition-all duration-700 hover:scale-105',
      ]"
    >
      <slot name="title">
        {{ title }}
      </slot>
    </h1>

    <!-- Description with better typography -->
    <p
      v-if="description || $slots.description"
      :class="[
        'text-muted mb-8 mx-auto leading-relaxed',
        descriptionSize === 'lg' ? 'text-xl max-w-3xl' : 'text-lg max-w-2xl',
        'transform transition-all duration-500 delay-100',
      ]"
    >
      <slot name="description">
        {{ description }}
      </slot>
    </p>

    <!-- Action buttons with enhanced spacing and effects -->
    <div
      v-if="$slots.actions || primaryAction || secondaryAction"
      class="flex flex-col sm:flex-row gap-4 justify-center transform transition-all duration-500 delay-200"
    >
      <slot name="actions">
        <UButton
          v-if="primaryAction"
          :to="primaryAction.to"
          :href="primaryAction.href"
          :variant="primaryAction.variant || 'gradient'"
          :size="primaryAction.size || 'lg'"
          class="glow-hover"
          :icon="primaryAction.icon"
          :target="primaryAction.href ? '_blank' : undefined"
        >
          {{ primaryAction.text }}
        </UButton>

        <UButton
          v-if="secondaryAction"
          :to="secondaryAction.to"
          :href="secondaryAction.href"
          :variant="secondaryAction.variant || 'outline'"
          :color="secondaryAction.color || 'neutral'"
          :size="secondaryAction.size || 'lg'"
          :icon="secondaryAction.icon"
          :target="secondaryAction.href ? '_blank' : undefined"
        >
          {{ secondaryAction.text }}
        </UButton>
      </slot>
    </div>
  </UContainer>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: null,
  },
  description: {
    type: String,
    default: null,
  },
  headingSize: {
    type: String,
    default: "xl",
    validator: (value) => ["lg", "xl"].includes(value),
  },
  descriptionSize: {
    type: String,
    default: "lg",
    validator: (value) => ["md", "lg"].includes(value),
  },
  containerSize: {
    type: String,
    default: "default",
  },
  gradient: {
    type: Boolean,
    default: false,
  },
  primaryAction: {
    type: Object,
    default: null,
    // { text: 'Learn More', to: '/about', variant: 'gradient', icon: 'i-lucide-user' }
  },
  secondaryAction: {
    type: Object,
    default: null,
    // { text: 'Read Articles', to: '/articles', variant: 'outline', icon: 'i-lucide-book' }
  },
});
</script>
