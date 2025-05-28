<script lang="ts" setup>
import type { LabelProps } from "reka-ui";
import type { HTMLAttributes } from "vue";
import { Label } from "../label";
import { useFormField } from "./useFormField";
import { useNuxtApp } from "nuxt/app";

const { $cn } = useNuxtApp();
const props = defineProps<LabelProps & { class?: HTMLAttributes["class"] }>();

const { error, formItemId } = useFormField();
</script>

<template>
  <Label
    :class="$cn(error && 'text-typography-500', props.class)"
    :for="formItemId"
  >
    <slot />
  </Label>
</template>
