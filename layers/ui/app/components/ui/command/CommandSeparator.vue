<script setup lang="ts">
import type { SeparatorProps } from "reka-ui";
import { Separator } from "reka-ui";
import { computed, type HTMLAttributes } from "vue";
import { useNuxtApp } from "nuxt/app";

const { $cn } = useNuxtApp();

const props = defineProps<
  SeparatorProps & { class?: HTMLAttributes["class"] }
>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});
</script>

<template>
  <Separator
    v-bind="delegatedProps"
    :class="$cn('-mx-1 h-px bg-surface-500', props.class)"
  >
    <slot />
  </Separator>
</template>
