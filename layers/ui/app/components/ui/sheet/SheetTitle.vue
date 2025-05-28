<script setup lang="ts">
import { DialogTitle, type DialogTitleProps } from "reka-ui";
import { computed, type HTMLAttributes } from "vue";
import { useNuxtApp } from "nuxt/app";

const { $cn } = useNuxtApp();

interface Props extends DialogTitleProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<Props>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});
</script>

<template>
  <DialogTitle
    :class="$cn('text-base font-medium', props.class)"
    v-bind="delegatedProps"
  >
    <slot />
  </DialogTitle>
</template>
