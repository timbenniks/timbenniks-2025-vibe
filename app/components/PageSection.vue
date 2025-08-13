<template>
  <section :class="['py-16', $attrs.class]">
    <UContainer :size="containerSize">
      <!-- Section header -->
      <header v-if="title || $slots.header" class="text-center mb-12">
        <slot name="header">
          <h2
            :class="[
              'font-bold mb-4',
              titleSize === 'xl' ? 'text-3xl' : 'text-2xl',
              'text-highlighted',
            ]"
          >
            {{ title }}
          </h2>
          <p v-if="subtitle" class="text-muted text-lg max-w-2xl mx-auto">
            {{ subtitle }}
          </p>
        </slot>
      </header>

      <!-- Main content -->
      <div :class="contentClasses">
        <slot />
      </div>

      <!-- Section footer -->
      <footer v-if="$slots.footer" class="text-center mt-12">
        <slot name="footer" />
      </footer>
    </UContainer>
  </section>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    default: null,
  },
  subtitle: {
    type: String,
    default: null,
  },
  titleSize: {
    type: String,
    default: "xl",
    validator: (value) => ["lg", "xl"].includes(value),
  },
  containerSize: {
    type: String,
    default: "default",
  },
  layout: {
    type: String,
    default: "default",
    validator: (value) =>
      ["default", "grid-2", "grid-3", "grid-4"].includes(value),
  },
});

const contentClasses = computed(() => {
  const layouts = {
    default: "",
    "grid-2": "grid grid-cols-1 md:grid-cols-2 gap-8",
    "grid-3": "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8",
    "grid-4": "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6",
  };

  return layouts[props.layout];
});
</script>
