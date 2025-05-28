<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { useNuxtApp } from "nuxt/app";

const { $cn } = useNuxtApp();

const props = defineProps<{
  class?: HTMLAttributes["class"];
}>();
</script>

<template>
  <div data-sidebar="group-content" :class="$cn('w-full text-sm', props.class)">
    <slot />
  </div>
</template>
