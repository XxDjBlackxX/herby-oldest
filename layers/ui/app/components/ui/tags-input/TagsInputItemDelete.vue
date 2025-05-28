<script lang="ts" setup>
import { type TagsInputItemDeleteProps, TagsInputItemDelete } from "reka-ui";
import { computed } from "vue";

const props = defineProps<TagsInputItemDeleteProps>();

const delegatedProps = computed(() => {
  const { ...delegated } = props;

  return delegated;
});
</script>

<template>
  <TagsInputItemDelete
    v-bind="delegatedProps"
    class="transition-all p-1 text-center bg-surface-800 rounded-primary hover:bg-surface-900"
  >
    <IconX :size="16" />
  </TagsInputItemDelete>
</template>
