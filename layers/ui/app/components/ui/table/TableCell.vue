<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { useNuxtApp } from "nuxt/app";

const { $cn } = useNuxtApp();
const props = defineProps<{
  class?: HTMLAttributes["class"];
}>();
</script>

<template>
  <td
    :class="$cn('p-4 align-middle [&:has([role=checkbox])]:pr-0', props.class)"
  >
    <slot />
  </td>
</template>
