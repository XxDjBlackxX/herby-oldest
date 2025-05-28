<script setup lang="ts">
import { DialogDescription, type DialogDescriptionProps } from "reka-ui";
import { computed, type HTMLAttributes } from "vue";
import { useNuxtApp } from "nuxt/app";

const { $cn } = useNuxtApp();

interface Props extends DialogDescriptionProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<Props>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});
</script>

<template>
  <DialogDescription
    :class="$cn('text-sm font-light', props.class)"
    v-bind="delegatedProps"
  >
    <slot />
  </DialogDescription>
</template>
