<script lang="ts" setup>
import type { HTMLAttributes } from "vue";
import { useNuxtApp } from "nuxt/app";

const { $cn } = useNuxtApp();

const props = defineProps<{
  class?: HTMLAttributes["class"];
}>();
</script>

<template>
  <li
    role="presentation"
    aria-hidden="true"
    :class="$cn('[&>svg]:w-3.5 [&>svg]:h-3.5', props.class)"
  >
    <slot>
      <IconChevronRight />
    </slot>
  </li>
</template>
