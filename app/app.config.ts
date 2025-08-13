export default defineAppConfig({
  ui: {
    colors: {
      primary: 'blue',      // Nuxt UI uses Tailwind's blue-500 as primary
      neutral: 'slate'      // Nuxt UI uses Tailwind's slate scale as neutral
    },
    // Extend Nuxt UI components with custom variants
    button: {
      variants: {
        variant: {
          gradient: {
            base: 'brand-gradient text-white border-transparent hover:opacity-90 focus:ring-2 focus:ring-primary/20 transition-all duration-200'
          },
          'gradient-outline': {
            base: 'bg-transparent text-transparent bg-clip-text border-2 border-transparent relative overflow-hidden before:absolute before:inset-0 before:p-[2px] before:brand-gradient before:rounded-[inherit] before:-z-10 before:mask-[linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)] before:mask-composite-[subtract] hover:before:opacity-80 transition-all duration-200',
            // Add gradient text class
            leadingIcon: 'text-primary',
            trailingIcon: 'text-primary'
          }
        }
      }
    },
    card: {
      variants: {
        variant: {
          'gradient-border': {
            base: 'relative overflow-hidden group',
            background: 'bg-transparent hover:shadow-lg transition-all duration-300',
            body: 'relative bg-background m-[1px] rounded-[calc(var(--ui-radius)-1px)]'
          }
        }
      }
    }
  }
})
