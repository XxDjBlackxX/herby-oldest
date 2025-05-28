<script setup lang="ts">
import type { ComboboxAnchorProps } from "reka-ui";
import { ComboboxAnchor, useForwardProps } from "reka-ui";
import { computed, type HTMLAttributes } from "vue";
import { useNuxtApp } from "nuxt/app";

const { $cn } = useNuxtApp();

const props = defineProps<
  ComboboxAnchorProps & { class?: HTMLAttributes["class"] }
>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});

const forwarded = useForwardProps(delegatedProps);
</script>

<template>
  <ComboboxAnchor v-bind="forwarded" :class="$cn('w-full', props.class)">
    <slot />
  </ComboboxAnchor>
</template>
