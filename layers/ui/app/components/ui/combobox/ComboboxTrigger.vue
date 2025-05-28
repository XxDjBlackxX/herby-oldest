<script setup lang="ts">
import type { ComboboxTriggerProps } from "reka-ui";
import { ComboboxTrigger, useForwardProps } from "reka-ui";
import { computed, type HTMLAttributes } from "vue";
import { useNuxtApp } from "nuxt/app";

const { $cn } = useNuxtApp();

const props = defineProps<
  ComboboxTriggerProps & { class?: HTMLAttributes["class"] }
>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});

const forwarded = useForwardProps(delegatedProps);
</script>

<template>
  <ComboboxTrigger
    v-bind="forwarded"
    :class="$cn('w-full', props.class)"
    tabindex="0"
  >
    <slot />
  </ComboboxTrigger>
</template>
