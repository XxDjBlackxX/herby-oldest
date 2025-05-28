<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { useNuxtApp } from "nuxt/app";

const { $cn } = useNuxtApp();

const props = defineProps<{
  class?: HTMLAttributes["class"];
}>();
</script>

<template>
  <div data-sidebar="footer" :class="$cn('flex flex-col gap-2', props.class)">
    <slot />
  </div>
</template>
