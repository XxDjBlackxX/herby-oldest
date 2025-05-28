<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { useNuxtApp } from "nuxt/app";

const { $cn } = useNuxtApp();
const props = defineProps<{
  class?: HTMLAttributes["class"];
}>();
</script>

<template>
  <th
    :class="
      $cn(
        'h-12 px-4 text-left whitespace-nowrap align-middle font-medium text-sm text-typography-500 [&:has([role=checkbox])]:pr-0',
        props.class,
      )
    "
  >
    <slot />
  </th>
</template>
