<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { useNuxtApp } from "nuxt/app";
import { type CardTitleVariants, cardTitleVariant } from ".";

const { $cn } = useNuxtApp();

const props = defineProps<{
  class?: HTMLAttributes["class"];
  size?: CardTitleVariants["size"];
}>();
</script>

<template>
  <h3 :class="$cn(cardTitleVariant({ size }), props.class)">
    <slot />
  </h3>
</template>
