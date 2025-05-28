<script setup lang="ts">
import { DialogDescription } from "reka-ui";
import type { DialogDescriptionProps } from "reka-ui";
import { type HtmlHTMLAttributes, computed } from "vue";
import { useNuxtApp } from "nuxt/app";

const { $cn } = useNuxtApp();

interface Props extends DialogDescriptionProps {
  class?: HtmlHTMLAttributes["class"];
}

const props = defineProps<Props>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});
</script>

<template>
  <DialogDescription
    v-bind="delegatedProps"
    :class="
      $cn('transition-all text-sm font-light text-typography-500', props.class)
    "
  >
    <slot />
  </DialogDescription>
</template>
