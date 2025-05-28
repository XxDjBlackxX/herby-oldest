<script setup lang="ts">
import { DrawerDescription, type DrawerDescriptionProps } from "vaul-vue";
import { type HtmlHTMLAttributes, computed } from "vue";
import { useNuxtApp } from "nuxt/app";

const { $cn } = useNuxtApp();

interface Props extends DrawerDescriptionProps {
  class?: HtmlHTMLAttributes["class"];
}

const props = defineProps<Props>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});
</script>

<template>
  <DrawerDescription
    v-bind="delegatedProps"
    :class="
      $cn('transition-all text-sm font-light text-typography-500', props.class)
    "
  >
    <slot />
  </DrawerDescription>
</template>
