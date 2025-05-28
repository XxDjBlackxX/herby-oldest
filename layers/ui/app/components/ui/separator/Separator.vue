<script setup lang="ts">
import { Separator, type SeparatorProps } from "reka-ui";
import { computed, type HTMLAttributes } from "vue";
import { useNuxtApp } from "nuxt/app";

const { $cn } = useNuxtApp();

const props = defineProps<
  SeparatorProps & { class?: HTMLAttributes["class"]; label?: string }
>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});
</script>

<template>
  <Separator
    v-bind="delegatedProps"
    :class="
      $cn(
        'shrink-0 bg-surface-500 relative',
        props.orientation === 'vertical' ? 'min-w-px h-full' : ' h-px w-full',
        props.class,
      )
    "
  >
    <span
      v-if="props.label"
      :class="
        $cn(
          'text-sm font-medium backdrop-blur-3xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center text-center whitespace-nowrap',
          props.orientation === 'vertical'
            ? 'w-[1px] px-1 py-2'
            : 'h-[1px] py-1 px-4',
        )
      "
      >{{ props.label }}</span
    >
  </Separator>
</template>
