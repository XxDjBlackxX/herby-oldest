<script setup lang="ts">
import { AlertDialogCancel } from "reka-ui";
import type { AlertDialogCancelProps } from "reka-ui";
import { type HtmlHTMLAttributes, computed } from "vue";
import { defaultButtonVariants } from "../button";
import { useNuxtApp } from "nuxt/app";

const { $cn } = useNuxtApp();

interface Props extends AlertDialogCancelProps {
  class?: HtmlHTMLAttributes["class"];
}

const props = defineProps<Props>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});
</script>

<template>
  <AlertDialogCancel
    v-bind="delegatedProps"
    :class="
      $cn('p-2', defaultButtonVariants({ variant: 'ghost' }), props.class)
    "
  >
    <IconX :size="16" />
  </AlertDialogCancel>
</template>
