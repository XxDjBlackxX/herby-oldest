<script setup lang="ts">
import { Label, type LabelProps } from "reka-ui";
import { type HTMLAttributes, computed } from "vue";
import { useNuxtApp } from "nuxt/app";

const { $cn } = useNuxtApp();

interface Props extends LabelProps {
  class?: HTMLAttributes["class"];
  required?: boolean;
}

const props = withDefaults(defineProps<Props>(), { class: "text-lg" });

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});
</script>

<template>
  <Label
    v-bind="delegatedProps"
    :class="
      $cn(
        'transition-all flex items-center font-medium text-typography-50 disabled:text-typography-500 group-aria-disabled:text-typography-500',
        props.class,
      )
    "
  >
    <slot />
    <span v-if="required" class="text-lg font-bold text-red-700">*</span>
  </Label>
</template>
