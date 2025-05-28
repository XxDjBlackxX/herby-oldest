<script lang="ts" setup>
import { AlertDialogTrigger, type AlertDialogTriggerProps } from "reka-ui";
import { type HTMLAttributes, computed } from "vue";

interface Props extends AlertDialogTriggerProps {
  class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<Props>(), {
  class: "flex items-center justify-start w-full",
});

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});
</script>

<template>
  <AlertDialogTrigger :class="props.class" v-bind="delegatedProps">
    <slot />
  </AlertDialogTrigger>
</template>
