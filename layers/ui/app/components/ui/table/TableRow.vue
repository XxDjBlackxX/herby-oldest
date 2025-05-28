<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { useNuxtApp } from "nuxt/app";

const { $cn } = useNuxtApp();
const props = defineProps<{
  class?: HTMLAttributes["class"];
}>();
</script>

<template>
  <tr
    :class="
      $cn(
        'border-b border-surface-500 transition-colors text-sm hover:bg-surface-200',
        props.class,
      )
    "
  >
    <slot />
  </tr>
</template>
