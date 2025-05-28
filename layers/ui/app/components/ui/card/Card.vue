<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { useNuxtApp } from "nuxt/app";

const { $cn } = useNuxtApp();

const props = withDefaults(
  defineProps<{
    class?: HTMLAttributes["class"];
    substratum?: boolean;
    variant?: "planet" | "base";
  }>(),
  { variant: "base" },
);
</script>

<template>
  <div
    :class="
      $cn(
        'relative p-3 outline-none bg-surface-100 ring-1 ring-surface-300',
        substratum
          ? 'rounded-t-primary border-b-4 border-primary-500'
          : 'rounded-primary border-none',
        {
          'planet-pattern': variant == 'planet',
        },
        props.class,
      )
    "
  >
    <slot />
  </div>
</template>
