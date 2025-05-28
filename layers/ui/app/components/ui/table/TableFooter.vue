<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { useNuxtApp } from "nuxt/app";

const { $cn } = useNuxtApp();
const props = defineProps<{
  class?: HTMLAttributes["class"];
}>();
</script>

<template>
  <tfoot
    :class="
      $cn(
        'px-2 py-4 rounded-b-primary border-t border-separator bg-surface-100 font-medium',
        props.class,
      )
    "
  >
    <slot />
  </tfoot>
</template>
