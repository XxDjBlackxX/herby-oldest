<script setup lang="ts">
import { PaginationFirst, type PaginationFirstProps } from "reka-ui";
import { Button } from "../button";
import { type HTMLAttributes, computed } from "vue";
import { useNuxtApp } from "nuxt/app";

const { $cn } = useNuxtApp();

const props = withDefaults(
  defineProps<PaginationFirstProps & { class?: HTMLAttributes["class"] }>(),
  {
    asChild: true,
  },
);

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});
</script>

<template>
  <PaginationFirst v-bind="delegatedProps">
    <Button
      :class="$cn('flex justify-center items-center w-10 h-10', props.class)"
      variant="ghost"
    >
      <slot>
        <IconChevronsLeft :size="20" />
      </slot>
    </Button>
  </PaginationFirst>
</template>
