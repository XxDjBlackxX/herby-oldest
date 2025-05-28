<script setup lang="ts">
import { ScrollAreaRoot, ScrollAreaViewport } from "../scroll-area";
import type { HTMLAttributes } from "vue";
import { useNuxtApp } from "nuxt/app";

const { $cn } = useNuxtApp();
const props = defineProps<{
  class?: HTMLAttributes["class"];
}>();
</script>

<template>
  <ScrollAreaRoot class="w-full h-full">
    <ScrollAreaViewport class="w-full h-full">
      <table :class="$cn('w-full caption-bottom', props.class)">
        <slot />
      </table>
    </ScrollAreaViewport>
  </ScrollAreaRoot>
</template>
