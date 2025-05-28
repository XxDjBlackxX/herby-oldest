<script setup lang="ts">
import type { HtmlHTMLAttributes } from "vue";
import { useForwardPropsEmits } from "reka-ui";
import DrawerOverlay from "./DrawerOverlay.vue";
import { DrawerContent, DrawerPortal } from "vaul-vue";
import type { DialogContentProps, DialogContentEmits } from "reka-ui";
import { useNuxtApp } from "nuxt/app";

const { $cn } = useNuxtApp();

interface Props extends DialogContentProps {
  class?: HtmlHTMLAttributes["class"];
}

const props = defineProps<Props>();
const emits = defineEmits<DialogContentEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <DrawerPortal>
    <DrawerOverlay />
    <DrawerContent
      v-bind="forwarded"
      class="fixed bottom-0 left-0 right-0 mt-24 z-[100] flex flex-col max-h-[96%] rounded-t-primary bg-surface-100 border border-surface-300"
    >
      <div class="mx-auto my-4 h-1 w-[100px] rounded-full bg-surface-800" />
      <div :class="$cn('container mb-10', props.class)">
        <slot />
      </div>
    </DrawerContent>
  </DrawerPortal>
</template>
