<script setup lang="ts">
import { DialogTitle } from "reka-ui";
import type { DialogTitleProps } from "reka-ui";
import { type HtmlHTMLAttributes, computed } from "vue";
import { useNuxtApp } from "nuxt/app";

const { $cn } = useNuxtApp();

interface Props extends DialogTitleProps {
  class?: HtmlHTMLAttributes["class"];
}

const props = defineProps<Props>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});
</script>

<template>
  <DialogTitle
    v-bind="delegatedProps"
    :class="$cn('flex items-center gap-2 text-base font-medium', props.class)"
  >
    <slot />
  </DialogTitle>
</template>
