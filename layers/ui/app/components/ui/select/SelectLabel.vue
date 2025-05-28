<script lang="ts" setup>
import { SelectLabel, type SelectLabelProps } from "reka-ui";
import { type HTMLAttributes } from "vue";
import { useNuxtApp } from "nuxt/app";

const { $cn } = useNuxtApp();
const props = defineProps<
  SelectLabelProps & { class?: HTMLAttributes["class"] }
>();
</script>

<template>
  <SelectLabel
    :class="
      $cn(
        'transition-all px-2 text-sm font-medium underline text-typography-500',
        props.class,
      )
    "
  >
    <slot />
  </SelectLabel>
</template>
