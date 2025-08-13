<template>
  <UContainer :size="containerSize" class="text-center py-16">
    <!-- Main heading -->
    <h1 
      :class="[
        'font-bold mb-6',
        headingSize === 'xl' ? 'text-5xl' : 'text-4xl',
        gradient ? 'text-brand' : 'text-highlighted'
      ]"
    >
      <slot name="title">
        {{ title }}
      </slot>
    </h1>

    <!-- Description -->
    <p 
      v-if="description || $slots.description"
      :class="[
        'text-muted mb-8 mx-auto',
        descriptionSize === 'lg' ? 'text-xl max-w-3xl' : 'text-lg max-w-2xl'
      ]"
    >
      <slot name="description">
        {{ description }}
      </slot>
    </p>

    <!-- Action buttons -->
    <div 
      v-if="$slots.actions || primaryAction || secondaryAction"
      class="flex flex-col sm:flex-row gap-4 justify-center"
    >
      <slot name="actions">
        <UButton
          v-if="primaryAction"
          :to="primaryAction.to"
          :href="primaryAction.href"
          :variant="primaryAction.variant || 'gradient'"
          :size="primaryAction.size || 'lg'"
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
    default: null
  },
  description: {
    type: String,
    default: null
  },
  headingSize: {
    type: String,
    default: 'xl',
    validator: (value) => ['lg', 'xl'].includes(value)
  },
  descriptionSize: {
    type: String,
    default: 'lg',
    validator: (value) => ['md', 'lg'].includes(value)
  },
  containerSize: {
    type: String,
    default: 'default'
  },
  gradient: {
    type: Boolean,
    default: false
  },
  primaryAction: {
    type: Object,
    default: null
    // { text: 'Learn More', to: '/about', variant: 'gradient', icon: 'i-lucide-user' }
  },
  secondaryAction: {
    type: Object,
    default: null
    // { text: 'Read Articles', to: '/articles', variant: 'outline', icon: 'i-lucide-book' }
  }
})
</script>
