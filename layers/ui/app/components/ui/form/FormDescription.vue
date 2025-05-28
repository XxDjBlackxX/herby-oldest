<script lang="ts" setup>
import type { HTMLAttributes } from "vue";
import { useFormField } from "./useFormField";
import { useNuxtApp } from "nuxt/app";

const { $cn } = useNuxtApp();

const props = defineProps<{
  class?: HTMLAttributes["class"];
}>();

const { formDescriptionId } = useFormField();
</script>

<template>
  <p :id="formDescriptionId" :class="$cn('text-sm', props.class)">
    <slot />
  </p>
</template>
