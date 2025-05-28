<script setup lang="ts">
import { SelectGroup, type SelectGroupProps } from "reka-ui";
import { type HTMLAttributes, computed } from "vue";
import { useNuxtApp } from "nuxt/app";

const { $cn } = useNuxtApp();
const props = defineProps<
  SelectGroupProps & { class?: HTMLAttributes["class"] }
>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});
</script>

<template>
  <SelectGroup
    :class="$cn('p-1 w-full space-y-1', props.class)"
    v-bind="delegatedProps"
  >
    <slot />
  </SelectGroup>
</template>
