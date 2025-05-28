<script lang="ts" setup>
import { useId } from "reka-ui";
import { type HTMLAttributes, provide } from "vue";
import { FORM_ITEM_INJECTION_KEY } from "./injectionKeys";
import { useNuxtApp } from "nuxt/app";

const { $cn } = useNuxtApp();
const props = defineProps<{
  class?: HTMLAttributes["class"];
}>();

const id = useId();
provide(FORM_ITEM_INJECTION_KEY, id);
</script>

<template>
  <div :class="$cn('space-y-1 w-full', props.class)">
    <slot />
  </div>
</template>
