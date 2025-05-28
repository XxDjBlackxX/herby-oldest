<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { useNuxtApp } from "nuxt/app";
import { cardDescriptionVariant, CardDescriptionVariants } from ".";

const { $cn } = useNuxtApp();

const props = defineProps<{
  class?: HTMLAttributes["class"];
  size?: CardDescriptionVariants["size"];
}>();
</script>

<template>
  <p :class="$cn(cardDescriptionVariant({ size }), props.class)">
    <slot />
  </p>
</template>
