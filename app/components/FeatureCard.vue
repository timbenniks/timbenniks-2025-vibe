<template>
  <UCard
    :variant="variant"
    :class="[
      'group transition-all duration-300 floating glass',
      interactive && 'cursor-pointer hover:scale-[1.02] glow-hover',
      variant === 'gradient-border' && 'relative overflow-hidden gradient-border',
      $attrs.class,
    ]"
  >
    <!-- Icon header with enhanced styling -->
    <template v-if="icon" #header>
      <div class="flex justify-center mb-4">
        <div
          class="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center relative group-hover:scale-110 transition-transform duration-300"
        >
          <div class="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-full animate-pulse" />
          <UIcon :name="icon" class="w-8 h-8 text-primary relative z-10" />
        </div>
      </div>
    </template>

    <!-- Title -->
    <h3
      v-if="title"
      class="text-lg font-semibold text-highlighted mb-2 text-center"
    >
      {{ title }}
    </h3>

    <!-- Description -->
    <p v-if="description" class="text-muted text-center mb-4">
      {{ description }}
    </p>

    <!-- Default slot for additional content -->
    <slot />

    <!-- Footer with action button -->
    <template v-if="$slots.footer || buttonText" #footer>
      <div class="flex justify-center pt-4">
        <slot name="footer">
          <UButton
            v-if="buttonText"
            :to="buttonTo"
            :variant="buttonVariant"
            :color="buttonColor"
            :size="buttonSize"
            :icon="buttonIcon"
          >
            {{ buttonText }}
          </UButton>
        </slot>
      </div>
    </template>
  </UCard>
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
  icon: {
    type: String,
    default: null,
  },
  variant: {
    type: String,
    default: "default",
    validator: (value) =>
      ["default", "elevated", "gradient-border"].includes(value),
  },
  interactive: {
    type: Boolean,
    default: false,
  },
  // Button props
  buttonText: {
    type: String,
    default: null,
  },
  buttonTo: {
    type: String,
    default: null,
  },
  buttonVariant: {
    type: String,
    default: "outline",
  },
  buttonColor: {
    type: String,
    default: "primary",
  },
  buttonSize: {
    type: String,
    default: "sm",
  },
  buttonIcon: {
    type: String,
    default: null,
  },
});
</script>
