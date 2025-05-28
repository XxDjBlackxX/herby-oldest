<script lang="ts" setup>
import { DialogTrigger, type DialogTriggerProps } from "reka-ui";
import { computed } from "vue";

const props = defineProps<DialogTriggerProps>();

const delegatedProps = computed(() => {
  const { ...delegated } = props;

  return delegated;
});
</script>

<template>
  <DialogTrigger v-bind="delegatedProps">
    <slot />
  </DialogTrigger>
</template>
