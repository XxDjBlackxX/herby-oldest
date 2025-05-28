<script setup lang="ts">
import type { ComboboxEmptyProps } from "reka-ui";
import { ComboboxEmpty } from "reka-ui";
import { computed, type HTMLAttributes } from "vue";
import { useNuxtApp } from "nuxt/app";

const { $cn } = useNuxtApp();

const props = defineProps<
  ComboboxEmptyProps & { class?: HTMLAttributes["class"] }
>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});
</script>

<template>
  <ComboboxEmpty
    v-bind="delegatedProps"
    :class="
      $cn(
        'flex items-center justify-center w-full py-6 text-center text-sm text-typography-500',
        props.class,
      )
    "
  >
    <slot />
  </ComboboxEmpty>
</template>
