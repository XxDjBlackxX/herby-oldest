<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { useNuxtApp } from "nuxt/app";

const { $cn } = useNuxtApp();
const props = defineProps<{
  class?: HTMLAttributes["class"];
}>();
</script>

<template>
  <li
    data-sidebar="menu-item"
    :class="$cn('group/menu-item relative', props.class)"
  >
    <slot />
  </li>
</template>
