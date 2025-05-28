<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { useNuxtApp } from "nuxt/app";

const { $cn } = useNuxtApp();
const props = defineProps<{
  class?: HTMLAttributes["class"];
}>();
</script>

<template>
  <caption :class="$cn('mt-4 text-sm text-typography-500', props.class)">
    <slot />
  </caption>
</template>
