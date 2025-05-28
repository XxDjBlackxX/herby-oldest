<script setup lang="ts">
import { PaginationNext, type PaginationNextProps } from "reka-ui";
import { Button } from "../button";
import { type HTMLAttributes, computed } from "vue";
import { useNuxtApp } from "nuxt/app";

const { $cn } = useNuxtApp();

const props = withDefaults(
  defineProps<PaginationNextProps & { class?: HTMLAttributes["class"] }>(),
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
  <PaginationNext v-bind="delegatedProps">
    <Button
      :class="
        $cn('flex justify-center items-center  w-10 h-10 p-0', props.class)
      "
      variant="ghost"
    >
      <slot>
        <IconChevronRight :size="20" />
      </slot>
    </Button>
  </PaginationNext>
</template>
