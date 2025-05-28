<script setup lang="ts">
import { PaginationPrev, type PaginationPrevProps } from "reka-ui";
import { Button } from "../button";
import { type HTMLAttributes, computed } from "vue";
import { useNuxtApp } from "nuxt/app";

const { $cn } = useNuxtApp();

const props = withDefaults(
  defineProps<PaginationPrevProps & { class?: HTMLAttributes["class"] }>(),
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
  <PaginationPrev v-bind="delegatedProps">
    <Button
      :class="
        $cn('flex justify-center items-center w-10 h-10 p-0', props.class)
      "
      variant="ghost"
    >
      <slot>
        <IconChevronLeft :size="20" />
      </slot>
    </Button>
  </PaginationPrev>
</template>
