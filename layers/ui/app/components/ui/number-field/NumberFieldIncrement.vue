<script setup lang="ts">
import type { NumberFieldIncrementProps } from "reka-ui";
import { NumberFieldIncrement, useForwardProps } from "reka-ui";
import { computed, type HTMLAttributes } from "vue";
import { useNuxtApp } from "nuxt/app";
import { defaultButtonVariants } from "../button";

const { $cn } = useNuxtApp();
const props = defineProps<
  NumberFieldIncrementProps & { class?: HTMLAttributes["class"] }
>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});

const forwarded = useForwardProps(delegatedProps);
</script>

<template>
  <NumberFieldIncrement
    data-slot="increment"
    v-bind="forwarded"
    :class="
      $cn(
        'absolute top-1/2 -translate-y-1/2 right-2 p-2',
        defaultButtonVariants({ align: 'center', variant: 'ghost' }),
        props.class,
      )
    "
  >
    <slot>
      <IconPlus :size="16" />
    </slot>
  </NumberFieldIncrement>
</template>
