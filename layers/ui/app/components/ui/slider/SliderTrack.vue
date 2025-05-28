<script lang="ts" setup>
import { SliderTrack } from "reka-ui";
import type { SliderTrackProps } from "reka-ui";
import { type HTMLAttributes, computed } from "vue";

interface Props extends SliderTrackProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<Props>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});
</script>

<template>
  <SliderTrack
    v-bind="delegatedProps"
    class="relative grow rounded-full h-[3px] bg-surface-500"
  >
    <slot />
  </SliderTrack>
</template>
