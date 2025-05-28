<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { useNuxtApp } from "nuxt/app";

const { $cn } = useNuxtApp();

const props = defineProps<{
  class?: HTMLAttributes["class"];
}>();
</script>

<template>
  <span
    :class="
      $cn(
        'ml-auto text-xs tracking-widest text-typography-500 font-light',
        props.class,
      )
    "
  >
    <slot />
  </span>
</template>
