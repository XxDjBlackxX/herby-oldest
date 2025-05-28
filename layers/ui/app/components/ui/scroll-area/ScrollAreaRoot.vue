<script setup lang="ts">
import { ScrollAreaRoot, type ScrollAreaRootProps } from "reka-ui";
import ScrollAreaScrollbar from "./ScrollAreaScrollbar.vue";
import ScrollAreaThumb from "./ScrollAreaThumb.vue";
import { type HTMLAttributes, computed } from "vue";
import { useNuxtApp } from "nuxt/app";

const { $cn } = useNuxtApp();

interface Props extends ScrollAreaRootProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<Props>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;
  return delegated;
});
</script>

<template>
  <ScrollAreaRoot
    v-bind="delegatedProps"
    :class="$cn('rounded-none overflow-hidden bg-transparent', props.class)"
    style="--scrollbar-size: 10px"
  >
    <slot />

    <ScrollAreaScrollbar orientation="vertical">
      <ScrollAreaThumb />
    </ScrollAreaScrollbar>
    <ScrollAreaScrollbar orientation="horizontal">
      <ScrollAreaThumb />
    </ScrollAreaScrollbar>
  </ScrollAreaRoot>
</template>
