<script setup lang="ts">
import {
  DropdownMenuLabel,
  type DropdownMenuLabelProps,
  useForwardProps,
} from "reka-ui";
import { type HTMLAttributes, computed } from "vue";
import { useNuxtApp } from "nuxt/app";

const { $cn } = useNuxtApp();

const props = defineProps<
  DropdownMenuLabelProps & { class?: HTMLAttributes["class"]; inset?: boolean }
>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});

const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
  <DropdownMenuLabel
    v-bind="forwardedProps"
    :class="
      $cn(
        'text-sm font-medium text-typography-500',
        inset && 'px-4',
        props.class,
      )
    "
  >
    <slot />
  </DropdownMenuLabel>
</template>
