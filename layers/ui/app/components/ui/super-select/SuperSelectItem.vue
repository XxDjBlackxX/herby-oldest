<script setup lang="ts">
import type { ComboboxItemEmits, ComboboxItemProps } from "reka-ui";
import {
  ComboboxItem,
  ComboboxItemIndicator,
  useForwardPropsEmits,
} from "reka-ui";
import { computed, type HTMLAttributes } from "vue";
import { useNuxtApp } from "nuxt/app";

const { $cn } = useNuxtApp();

const props = defineProps<
  ComboboxItemProps & { class?: HTMLAttributes["class"] }
>();
const emits = defineEmits<ComboboxItemEmits>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});

const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<template>
  <ComboboxItem
    v-bind="forwarded"
    :class="
      $cn(
        'transition-all relative cursor-pointer flex items-center justify-start overflow-hidden w-full p-2 border-none outline-none rounded-primary gap-2 font-medium hover:bg-primary-500 text-typography-500 hover:text-primary-foreground data-[disabled]:pointer-events-none data-[state=checked]:bg-primary-500 data-[state=checked]:text-primary-foreground data-[state=checked]:hover:bg-primary-600',
        props.class,
      )
    "
  >
    <slot />
    <ComboboxItemIndicator
      class="absolute right-3 w-[25px] inline-flex items-center justify-center bg-primary-500 p-1 rounded-primary"
    >
      <IconCheck :size="16" />
    </ComboboxItemIndicator>
  </ComboboxItem>
</template>
