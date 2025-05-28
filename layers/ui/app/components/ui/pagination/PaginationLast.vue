<script setup lang="ts">
import { PaginationLast, type PaginationLastProps } from "reka-ui";
import { Button } from "../button";
import { type HTMLAttributes, computed } from "vue";
import { useNuxtApp } from "nuxt/app";

const { $cn } = useNuxtApp();

const props = withDefaults(
  defineProps<PaginationLastProps & { class?: HTMLAttributes["class"] }>(),
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
  <PaginationLast v-bind="delegatedProps">
    <Button
      :class="
        $cn('flex justify-center items-center w-10 h-10 p-0', props.class)
      "
      variant="ghost"
    >
      <slot>
        <IconChevronsRight :size="20" />
      </slot>
    </Button>
  </PaginationLast>
</template>
