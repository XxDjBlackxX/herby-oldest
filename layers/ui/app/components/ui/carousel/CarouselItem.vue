<script setup lang="ts">
import type { WithClassAsProps } from "./interface";
import { useCarousel } from "./useCarousel";
import { useNuxtApp } from "nuxt/app";

const { $cn } = useNuxtApp();

const props = defineProps<WithClassAsProps>();

const { orientation } = useCarousel();
</script>

<template>
  <div
    role="group"
    aria-roledescription="slide"
    :class="
      $cn(
        $style.item,
        orientation === 'horizontal' ? 'pl-4' : 'pt-4',
        props.class,
      )
    "
  >
    <slot />
  </div>
</template>

<style module scoped>
.item {
  @apply min-w-0 shrink-0 grow-0 basis-full;
}
</style>
