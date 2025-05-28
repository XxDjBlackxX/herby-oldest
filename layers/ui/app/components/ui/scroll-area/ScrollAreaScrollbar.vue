<script setup lang="ts">
import { ScrollAreaScrollbar, type ScrollAreaThumbProps } from "reka-ui";
import { type HTMLAttributes, computed } from "vue";

interface Props extends ScrollAreaThumbProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<Props>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;
  return delegated;
});
</script>

<template>
  <ScrollAreaScrollbar
    v-bind="delegatedProps"
    class="flex select-none touch-none p-0.5 bg-surface-300 transition-colors ease-out hover:bg-surface-800 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5"
  >
    <slot />
  </ScrollAreaScrollbar>
</template>
