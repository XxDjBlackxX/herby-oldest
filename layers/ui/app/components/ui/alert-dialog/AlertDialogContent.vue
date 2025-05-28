<script setup lang="ts">
import type { HtmlHTMLAttributes } from "vue";
import AlertDialogOverlay from "./AlertDialogOverlay.vue";
import {
  useForwardPropsEmits,
  AlertDialogContent,
  AlertDialogPortal,
} from "reka-ui";
import type { AlertDialogContentProps, AlertDialogContentEmits } from "reka-ui";

interface Props extends AlertDialogContentProps {
  class?: HtmlHTMLAttributes["class"];
}

const props = defineProps<Props>();
const emits = defineEmits<AlertDialogContentEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <AlertDialogPortal>
    <AlertDialogOverlay />
    <AlertDialogContent
      v-bind="forwarded"
      class="transition-all data-[state=open]:animate-content-show data-[state=closed]:animate-content-hide outline-none fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-[100] rounded-primary w-[90%] sm:w-[340px] p-4 border border-surface-300 bg-surface-100"
    >
      <slot />
    </AlertDialogContent>
  </AlertDialogPortal>
</template>
