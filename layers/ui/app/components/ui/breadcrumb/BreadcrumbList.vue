<script lang="ts" setup>
import type { HTMLAttributes } from "vue";
import { useNuxtApp } from "nuxt/app";

const { $cn } = useNuxtApp();

const props = defineProps<{
  class?: HTMLAttributes["class"];
}>();
</script>

<template>
  <ol
    :class="
      $cn(
        'flex flex-wrap items-center gap-1.5 break-words text-sm text-typography-500 sm:gap-2.5',
        props.class,
      )
    "
  >
    <slot />
  </ol>
</template>
