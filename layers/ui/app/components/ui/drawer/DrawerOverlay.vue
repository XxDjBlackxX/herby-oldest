<script setup lang="ts">
import type { DialogOverlayProps } from "reka-ui";
import { DrawerOverlay } from "vaul-vue";
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
  <DrawerOverlay
    v-bind="delegatedProps"
    :class="$cn('fixed inset-0 z-[100] bg-black/80', props.class)"
  />
</template>
