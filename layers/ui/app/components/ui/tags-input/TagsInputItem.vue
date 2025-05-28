<script lang="ts" setup>
import { type TagsInputItemProps, TagsInputItem } from "reka-ui";
import { type HTMLAttributes, computed } from "vue";

interface Props extends TagsInputItemProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<Props>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});
</script>

<template>
  <TagsInputItem
    v-bind="delegatedProps"
    class="transition-all flex items-center justify-center p-1 rounded-primary gap-2 font-medium outline-none bg-surface-500 border border-solid border-surface-800"
  >
    <slot />
  </TagsInputItem>
</template>
