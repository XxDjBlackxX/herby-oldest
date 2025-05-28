<script setup lang="ts">
import { ScrollAreaRoot, ScrollAreaViewport } from "../scroll-area";
import {
  DialogContent,
  type DialogContentEmits,
  type DialogContentProps,
  DialogOverlay,
  DialogPortal,
  useForwardPropsEmits,
} from "reka-ui";
import { computed, type HTMLAttributes } from "vue";
import { type SheetVariants, sheetVariants } from ".";
import { useNuxtApp } from "nuxt/app";

const { $cn } = useNuxtApp();

interface SheetContentProps extends DialogContentProps {
  class?: HTMLAttributes["class"];
  side?: SheetVariants["side"];
}

defineOptions({
  inheritAttrs: false,
});

const props = defineProps<SheetContentProps>();
const emits = defineEmits<DialogContentEmits>();

const delegatedProps = computed(() => {
  const { class: _, side, ...delegated } = props;

  return delegated;
});

const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<template>
  <DialogPortal>
    <DialogOverlay
      class="data-[state=open]:animate-overlay-show data-[state=closed]:animate-overlay-hide fixed inset-0 z-[100] bg-black/80 backdrop-blur-lg"
    />
    <DialogContent
      :class="$cn(sheetVariants({ side }), props.class)"
      v-bind="{ ...forwarded, ...$attrs }"
    >
      <ScrollAreaRoot class="w-full h-full">
        <ScrollAreaViewport class="w-full max-h-full p-[1.4rem]">
          <slot />
        </ScrollAreaViewport>
      </ScrollAreaRoot>
    </DialogContent>
  </DialogPortal>
</template>
