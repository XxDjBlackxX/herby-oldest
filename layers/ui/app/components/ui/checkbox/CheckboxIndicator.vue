<script setup lang="ts">
import { CheckboxIndicator, type CheckboxIndicatorProps } from "reka-ui";

const props = defineProps<CheckboxIndicatorProps>();

const delegatedProps = computed(() => {
  const { ...delegated } = props;

  return delegated;
});
</script>

<template>
  <CheckboxIndicator
    v-bind="delegatedProps"
    class="w-3.5 h-3.5 bg-typography-50 rounded-[5px] transition-all"
  >
  </CheckboxIndicator>
</template>
