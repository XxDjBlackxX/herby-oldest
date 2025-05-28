<script setup lang="ts">
import type { ComboboxTriggerProps } from "reka-ui";
import { ComboboxTrigger, useForwardProps } from "reka-ui";
import { computed, type HTMLAttributes } from "vue";
import { useNuxtApp } from "nuxt/app";
import ComboboxAnchor from "./SuperSelectAnchor.vue";
import { defaultButtonVariants } from "../button";
import { SuperSelectTriggerVariants, superSelectTriggerVariants } from ".";

const { $cn } = useNuxtApp();

const props = defineProps<
  ComboboxTriggerProps & {
    class?: HTMLAttributes["class"];
    size?: SuperSelectTriggerVariants["size"];
    waiting?: boolean;
    disabled?: boolean;
  }
>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});

const forwarded = useForwardProps(delegatedProps);
</script>

<template>
  <ComboboxAnchor>
    <ComboboxTrigger
      v-bind="forwarded"
      :class="
        $cn(
          defaultButtonVariants({ variant: 'secondary' }),
          superSelectTriggerVariants({ size }),
          props.class,
        )
      "
      :style="{}"
      :disabled="waiting || disabled"
      tabindex="0"
      v-auto-animate
    >
      <span>
        <slot />
      </span>
      <IconChevronsUpDown :size="16" />
      <span
        v-if="waiting"
        class="absolute top-0 left-0 w-full h-full flex items-center justify-center backdrop-blur-sm"
      >
        <IconLoader :size="20" />
      </span>
    </ComboboxTrigger>
  </ComboboxAnchor>
</template>
