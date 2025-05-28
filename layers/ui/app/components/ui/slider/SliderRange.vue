<script lang="ts" setup>
import { SliderRange } from "reka-ui";
import type { SliderRangeProps } from "reka-ui";
import { type HTMLAttributes, computed } from "vue";

interface Props extends SliderRangeProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<Props>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});
</script>

<template>
  <SliderRange
    v-bind="delegatedProps"
    class="transition-all absolute bg-primary-500 rounded-full h-full"
  />
</template>
