<script setup lang="ts">
import {
  CheckboxRoot,
  useForwardPropsEmits,
  type CheckboxRootEmits,
  type CheckboxRootProps,
} from "reka-ui";
import { useNuxtApp } from "nuxt/app";

const { $cn } = useNuxtApp();

const props = withDefaults(defineProps<CheckboxRootProps>(), {});
const emits = defineEmits<CheckboxRootEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <CheckboxRoot
    v-bind="forwarded"
    :class="
      $cn(
        'transition-all flex w-6 h-6 appearance-none items-center justify-center rounded-primary outline-none',
        props.checked ? 'bg-primary-500' : 'bg-surface-100',
      )
    "
  >
    <slot />
  </CheckboxRoot>
</template>
