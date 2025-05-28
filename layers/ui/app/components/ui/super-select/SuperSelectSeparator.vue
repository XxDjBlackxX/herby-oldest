<script setup lang="ts">
import type { ComboboxSeparatorProps } from "reka-ui";
import { ComboboxSeparator } from "reka-ui";
import { computed, type HTMLAttributes } from "vue";
import { useNuxtApp } from "nuxt/app";

const { $cn } = useNuxtApp();

const props = defineProps<
  ComboboxSeparatorProps & { class?: HTMLAttributes["class"] }
>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});
</script>

<template>
  <ComboboxSeparator
    v-bind="delegatedProps"
    :class="$cn('-mx-1 h-px bg-surface-500', props.class)"
  >
    <slot />
  </ComboboxSeparator>
</template>
