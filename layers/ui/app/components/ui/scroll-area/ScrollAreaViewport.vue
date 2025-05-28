<script setup lang="ts">
import { ScrollAreaViewport, type ScrollAreaViewportProps } from "reka-ui";
import { type HTMLAttributes, computed } from "vue";

interface Props extends ScrollAreaViewportProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<Props>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;
  return delegated;
});
</script>

<template>
  <ScrollAreaViewport
    v-bind="delegatedProps"
    :class="$cn('', props.class)"
    style="--scrollbar-size: 10px"
  >
    <slot />
  </ScrollAreaViewport>
</template>
