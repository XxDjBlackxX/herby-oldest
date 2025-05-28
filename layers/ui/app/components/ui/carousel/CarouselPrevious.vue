<script setup lang="ts">
import type { WithClassAsProps } from "./interface";
import { Button } from "../button";
import { useCarousel } from "./useCarousel";
import { useNuxtApp } from "nuxt/app";

const { $cn } = useNuxtApp();

const props = defineProps<WithClassAsProps>();

const { orientation, canScrollPrev, scrollPrev } = useCarousel();
</script>

<template>
  <Button
    :disabled="!canScrollPrev"
    :class="
      $cn(
        'touch-manipulation absolute justify-center h-8 w-8 p-0',
        orientation === 'horizontal'
          ? 'left-5 md:-left-10 top-1/2 -translate-y-1/2'
          : '-top-12 left-1/2 -translate-x-1/2 rotate-90',
        props.class,
      )
    "
    variant="secondary"
    @click="scrollPrev"
  >
    <slot>
      <IconArrowLeft :size="16" class="text-current" />
      <span class="sr-only">Previous Slide</span>
    </slot>
  </Button>
</template>
