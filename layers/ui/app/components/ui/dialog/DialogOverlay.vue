<script setup lang="ts">
import { DialogOverlay } from "reka-ui";
import type { DialogOverlayProps } from "reka-ui";
import { type HtmlHTMLAttributes, computed } from "vue";
import { useNuxtApp } from "nuxt/app";

const { $cn } = useNuxtApp();

interface Props extends DialogOverlayProps {
  class?: HtmlHTMLAttributes["class"];
}

const props = defineProps<Props>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});
</script>

<template>
  <DialogOverlay
    v-bind="delegatedProps"
    :class="
      $cn(
        'data-[state=open]:animate-overlay-show data-[state=closed]:animate-overlay-hide fixed inset-0 z-[100] backdrop-blur-xl bg-black/40',
        props.class,
      )
    "
  />
</template>
