<script setup lang="ts">
import { PaginationEllipsis, type PaginationEllipsisProps } from "reka-ui";
import { type HTMLAttributes, computed } from "vue";
import { useNuxtApp } from "nuxt/app";

const { $cn } = useNuxtApp();

const props = defineProps<
  PaginationEllipsisProps & { class?: HTMLAttributes["class"] }
>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});
</script>

<template>
  <PaginationEllipsis
    v-bind="delegatedProps"
    :class="$cn('w-9 h-9 flex items-center justify-center', props.class)"
  >
    <slot>
      <IconMoreHorizontal />
    </slot>
  </PaginationEllipsis>
</template>
