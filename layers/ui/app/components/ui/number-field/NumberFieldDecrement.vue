<script setup lang="ts">
import type { NumberFieldDecrementProps } from "reka-ui";
import { NumberFieldDecrement, useForwardProps } from "reka-ui";
import { computed, type HTMLAttributes } from "vue";
import { useNuxtApp } from "nuxt/app";
import { defaultButtonVariants } from "../button";

const { $cn } = useNuxtApp();
const props = defineProps<
  NumberFieldDecrementProps & { class?: HTMLAttributes["class"] }
>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});

const forwarded = useForwardProps(delegatedProps);
</script>

<template>
  <NumberFieldDecrement
    data-slot="decrement"
    v-bind="forwarded"
    :class="
      $cn(
        'absolute top-1/2 -translate-y-1/2 left-2 p-2 opacity-100',
        defaultButtonVariants({ align: 'center', variant: 'ghost' }),
        props.class,
      )
    "
  >
    <slot>
      <IconMinus :size="16" />
    </slot>
  </NumberFieldDecrement>
</template>
