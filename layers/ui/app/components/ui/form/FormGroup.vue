<script lang="ts" setup>
import type { FormGroupProps } from ".";
import { useNuxtApp } from "nuxt/app";

const { $cn } = useNuxtApp();
const props = defineProps<FormGroupProps>();
</script>

<template>
  <fieldset
    role="group"
    :disabled="disabled"
    :class="
      $cn(
        'disabled:pointer-events-none disabled:opacity-80 disabled:line-through',
        props.class,
      )
    "
  >
    <slot />
  </fieldset>
</template>
