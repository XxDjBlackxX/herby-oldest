<script lang="ts" setup>
import { PopoverTrigger, type PopoverTriggerProps } from "reka-ui";
import { type PopoverTriggerVariants, popoverTriggerVariants } from ".";
import { computed } from "vue";

interface Props extends PopoverTriggerProps {
  variant?: PopoverTriggerVariants["variant"];
}

const props = defineProps<Props>();

const delegatedProps = computed(() => {
  const { ...delegated } = props;
  return delegated;
});
</script>

<template>
  <PopoverTrigger
    v-bind="delegatedProps"
    :class="popoverTriggerVariants({ variant })"
  >
    <slot />
  </PopoverTrigger>
</template>
