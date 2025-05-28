<script setup lang="ts">
import type { HtmlHTMLAttributes } from "vue";
import DialogOverlay from "./DialogOverlay.vue";
import {
  useForwardPropsEmits,
  DialogContent,
  DialogPortal,
  DialogClose,
} from "reka-ui";
import type { DialogContentProps, DialogContentEmits } from "reka-ui";
import { defaultButtonVariants } from "../button";
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
  <DialogPortal>
    <DialogOverlay />
    <DialogContent
      v-bind="forwarded"
      :class="
        $cn(
          'transition-all outline-none data-[state=open]:animate-content-show data-[state=closed]:animate-content-hide fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none z-[100] flex flex-col items-start max-sm:w-[90%] gap-y-5 p-5 rounded-primary bg-surface-100 border border-surface-300',
          props.class,
        )
      "
    >
      <slot />
      <DialogClose
        :class="
          $cn(
            'absolute right-4 top-4 p-2',
            defaultButtonVariants({ variant: 'ghost' }),
          )
        "
      >
        <IconX :size="16" />
        <span class="sr-only">Close</span>
      </DialogClose>
    </DialogContent>
  </DialogPortal>
</template>
