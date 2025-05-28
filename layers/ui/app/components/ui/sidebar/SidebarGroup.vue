<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { useNuxtApp } from "nuxt/app";

const { $cn } = useNuxtApp();

const props = defineProps<{
  class?: HTMLAttributes["class"];
}>();
</script>

<template>
  <div
    data-sidebar="group"
    :class="$cn('relative flex w-full min-w-0 flex-col', props.class)"
  >
    <slot />
  </div>
</template>
