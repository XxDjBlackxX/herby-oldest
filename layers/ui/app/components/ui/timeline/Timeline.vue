<script lang="ts" setup>
import { useNuxtApp } from "nuxt/app";

const { $cn } = useNuxtApp();

const props = defineProps({
  values: {
    type: Array as PropType<{ name: string; icon: any }[]>,
    required: true,
  },
});

const itemClasses = (index: number) => {
  const baseClasses = "flex flex-col w-full z-10 -mt-3 gap-3";
  const positionClasses = {
    "items-end": props.values.length === index + 1,
    "items-start": props.values.length !== index + 1,
    "items-center": index !== 0 && index !== props.values.length - 1,
  };
  return $cn(baseClasses, positionClasses);
};

const textClasses = (index: number) => {
  const baseClasses =
    "transition-all font-light text-start text-sm text-typography";
  const positionClasses = {
    "text-end": props.values.length === index + 1,
    "text-start": props.values.length !== index + 1,
    "text-center": index !== 0 && index !== props.values.length - 1,
  };
  return $cn(baseClasses, positionClasses);
};
</script>

<template>
  <ol class="relative flex items-start w-full justify-between">
    <div class="absolute z-0 flex w-full min-h-0.5 bg-surface-200" />
    <li
      v-for="(value, index) in values"
      :key="index"
      :class="itemClasses(index)"
    >
      <div
        class="flex items-center justify-center p-1.5 rounded-full ring-0 sm:ring-4 shrink-0 ring-surface-200 bg-surface-400"
      >
        <component :is="value.icon" :size="14" />
      </div>
      <p :class="textClasses(index)">
        {{ value.name }}
      </p>
    </li>
  </ol>
</template>
