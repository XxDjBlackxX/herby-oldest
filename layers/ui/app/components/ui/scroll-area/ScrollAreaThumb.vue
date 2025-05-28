<script setup lang="ts">
import { ScrollAreaThumb, type ScrollAreaThumbProps } from "reka-ui";
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
  <ScrollAreaThumb
    v-bind="delegatedProps"
    class="flex-1 bg-primary-500 rounded-[10px] relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]"
  />
</template>
