<script setup lang="ts">
import {
  SelectIcon,
  SelectTrigger,
  type SelectTriggerProps,
  useForwardProps,
} from "reka-ui";
import { type HTMLAttributes, computed } from "vue";
import { defaultButtonVariants } from "../button";
import { selectTriggerVariants, SelectTriggerVariants } from ".";
import { useNuxtApp } from "nuxt/app";

const { $cn } = useNuxtApp();
const props = defineProps<
  SelectTriggerProps & {
    class?: HTMLAttributes["class"];
    size?: SelectTriggerVariants["size"];
    waiting?: boolean;
  }
>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});

const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
  <SelectTrigger
    v-bind="forwardedProps"
    :style="{}"
    :disabled="waiting"
    :class="
      $cn(
        defaultButtonVariants({ variant: 'secondary' }),
        selectTriggerVariants({ size }),
        props.class,
      )
    "
    v-auto-animate
  >
    <slot />
    <SelectIcon as-child>
      <IconChevronDown :size="16" class="opacity-50 shrink-0" />
    </SelectIcon>
    <span
      v-if="waiting"
      class="absolute top-0 left-0 w-full h-full flex items-center justify-center backdrop-blur-sm"
    >
      <IconLoader :size="20" />
    </span>
  </SelectTrigger>
</template>
