<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { useNuxtApp } from "nuxt/app";

const { $cn } = useNuxtApp();
const props = defineProps<{
  class?: HTMLAttributes["class"];
}>();
</script>

<template>
  <tbody
    :class="$cn('[&_tr:last-child]:border-0 border-surface-500', props.class)"
  >
    <slot />
  </tbody>
</template>
