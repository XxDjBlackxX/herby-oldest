<script setup lang="ts">
import {
  SelectScrollUpButton,
  type SelectScrollUpButtonProps,
  useForwardProps,
} from "reka-ui";
import { type HTMLAttributes, computed } from "vue";
import { useNuxtApp } from "nuxt/app";

const { $cn } = useNuxtApp();
const props = defineProps<
  SelectScrollUpButtonProps & { class?: HTMLAttributes["class"] }
>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});

const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
  <SelectScrollUpButton
    v-bind="forwardedProps"
    :class="
      $cn(
        'transition-all flex items-center justify-center py-2 cursor-pointer',
        props.class,
      )
    "
  >
    <slot>
      <IconChevronUp :size="18" />
    </slot>
  </SelectScrollUpButton>
</template>
