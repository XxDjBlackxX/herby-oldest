<script lang="ts" setup>
import { SliderThumb } from "reka-ui";
import type { SliderThumbProps } from "reka-ui";
import { type HTMLAttributes, computed } from "vue";

interface Props extends SliderThumbProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<Props>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});
</script>

<template>
  <SliderThumb
    v-bind="delegatedProps"
    class="transition-all flex flex-col items-center w-4 h-4 order-1 rounded-full border-none outline-none cursor-grab font-medium bg-primary-500 focus:w-4.5 focus:h-4.5"
    aria-label="Volume"
  />
</template>
