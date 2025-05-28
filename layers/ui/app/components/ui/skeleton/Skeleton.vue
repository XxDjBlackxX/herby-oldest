<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { useNuxtApp } from "nuxt/app";

const { $cn } = useNuxtApp();

interface SkeletonProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<SkeletonProps>();
</script>

<template>
  <div
    :class="
      $cn(
        'skeleton-animation flex items-center justify-center rounded-primary',
        props.class,
      )
    "
  ></div>
</template>

<style scoped>
@keyframes shimmer {
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: calc(300px + 100%) 0;
  }
}

.skeleton-animation {
  background: linear-gradient(
    90deg,
    hsl(var(--surface-400)) 25%,
    hsl(var(--surface-900)) 37%,
    hsl(var(--surface-400)) 63%
  );
  background-size: 400px 100%;
  animation: shimmer 1.5s infinite;
}
</style>
