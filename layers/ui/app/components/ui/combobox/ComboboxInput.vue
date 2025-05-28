<script setup lang="ts">
import {
  ComboboxInput,
  type ComboboxInputProps,
  useForwardProps,
} from "reka-ui";
import { computed, type HTMLAttributes } from "vue";
import { useNuxtApp } from "nuxt/app";

const { $cn } = useNuxtApp();

const props = defineProps<
  ComboboxInputProps & {
    class?: HTMLAttributes["class"];
  }
>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});

const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
  <ComboboxInput
    v-bind="forwardedProps"
    united="input"
    :class="$cn('flex h-9 w-full', props.class)"
  >
    <slot />
  </ComboboxInput>
</template>
