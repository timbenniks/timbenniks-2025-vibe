<template>
  <UCard
    :variant="variant" 
    :class="[
      'group transition-all duration-300',
      interactive && 'cursor-pointer hover:scale-[1.02]',
      variant === 'gradient-border' && 'relative overflow-hidden',
      $attrs.class
    ]"
  >
    <!-- Gradient border effect for special variant -->
    <div
      v-if="variant === 'gradient-border'"
      class="absolute inset-0 brand-gradient rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
    />
    
    <!-- Icon header -->
    <template v-if="icon" #header>
      <div class="flex justify-center mb-4">
        <div class="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
          <UIcon :name="icon" class="w-8 h-8 text-primary" />
        </div>
      </div>
    </template>

    <!-- Title -->
    <h3 v-if="title" class="text-lg font-semibold text-highlighted mb-2 text-center">
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
    default: null
  },
  description: {
    type: String,
    default: null
  },
  icon: {
    type: String,
    default: null
  },
  variant: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'elevated', 'gradient-border'].includes(value)
  },
  interactive: {
    type: Boolean,
    default: false
  },
  // Button props
  buttonText: {
    type: String,
    default: null
  },
  buttonTo: {
    type: String,
    default: null
  },
  buttonVariant: {
    type: String,
    default: 'outline'
  },
  buttonColor: {
    type: String,
    default: 'primary'
  },
  buttonSize: {
    type: String,
    default: 'sm'
  },
  buttonIcon: {
    type: String,
    default: null
  }
})
</script>
