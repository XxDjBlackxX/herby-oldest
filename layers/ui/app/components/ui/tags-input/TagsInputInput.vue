<script lang="ts" setup>
import { type TagsInputInputProps, TagsInputInput } from "reka-ui";
import { computed } from "vue";

const props = defineProps<TagsInputInputProps>();

const delegatedProps = computed(() => {
  const { ...delegated } = props;

  return delegated;
});
</script>

<template>
  <TagsInputInput
    v-bind="delegatedProps"
    class="transition-all text-sm outline-none border-none resize-none flex items-center justify-start w-full p-1 font-medium placeholder:text-typography-600 focus:placeholder:text-typography-900 bg-transparent"
  />
</template>
