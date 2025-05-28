<script setup lang="ts">
import {
  SelectScrollDownButton,
  type SelectScrollDownButtonProps,
  useForwardProps,
} from "reka-ui";
import { computed, type HTMLAttributes } from "vue";
import { useNuxtApp } from "nuxt/app";

const { $cn } = useNuxtApp();
const props = defineProps<
  SelectScrollDownButtonProps & { class?: HTMLAttributes["class"] }
>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});

const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
  <SelectScrollDownButton
    v-bind="forwardedProps"
    :class="
      $cn(
        'transition-all flex items-center justify-center py-2 cursor-pointer',
        props.class,
      )
    "
  >
    <slot>
      <IconChevronDown :size="18" />
    </slot>
  </SelectScrollDownButton>
</template>
