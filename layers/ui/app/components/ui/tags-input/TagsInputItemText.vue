<script lang="ts" setup>
import { type TagsInputItemTextProps, TagsInputItemText } from "reka-ui";
import { computed } from "vue";

const props = defineProps<TagsInputItemTextProps>();

const delegatedProps = computed(() => {
  const { ...delegated } = props;

  return delegated;
});
</script>

<template>
  <TagsInputItemText
    v-bind="delegatedProps"
    v-auto-animate
    class="text-sm pl-1"
  />
</template>
