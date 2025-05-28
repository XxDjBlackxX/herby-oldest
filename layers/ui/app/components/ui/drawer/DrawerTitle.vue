<script setup lang="ts">
import { DrawerTitle, type DrawerTitleProps } from "vaul-vue";
import { type HtmlHTMLAttributes, computed } from "vue";
import { useNuxtApp } from "nuxt/app";

const { $cn } = useNuxtApp();

interface Props extends DrawerTitleProps {
  class?: HtmlHTMLAttributes["class"];
}

const props = defineProps<Props>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});
</script>

<template>
  <DrawerTitle
    v-bind="delegatedProps"
    :class="$cn('flex items-center gap-2 text-lg font-medium', props.class)"
  >
    <slot />
  </DrawerTitle>
</template>
