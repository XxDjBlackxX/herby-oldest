<script setup lang="ts">
import {
  DropdownMenuSeparator,
  type DropdownMenuSeparatorProps,
} from "reka-ui";
import { type HTMLAttributes, computed } from "vue";
import { useNuxtApp } from "nuxt/app";

const { $cn } = useNuxtApp();

const props = defineProps<
  DropdownMenuSeparatorProps & {
    class?: HTMLAttributes["class"];
  }
>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});
</script>

<template>
  <DropdownMenuSeparator
    v-bind="delegatedProps"
    :class="$cn('w-full h-px rounded-full bg-surface-500', props.class)"
  />
</template>
