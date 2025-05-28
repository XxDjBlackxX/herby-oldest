<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { useNuxtApp } from "nuxt/app";

const { $cn } = useNuxtApp();
const props = defineProps<{
  class?: HTMLAttributes["class"];
}>();
</script>

<template>
  <thead :class="$cn('[&_tr]:border-b border-surface-500', props.class)">
    <slot />
  </thead>
</template>
