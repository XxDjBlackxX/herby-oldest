<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Input } from "../input";
import { useNuxtApp } from "nuxt/app";

const { $cn } = useNuxtApp();

const props = defineProps<{
  class?: HTMLAttributes["class"];
}>();
</script>

<template>
  <Input data-sidebar="input" :class="$cn('h-8', props.class)">
    <slot />
  </Input>
</template>
