<script setup lang="ts">
import type { PrimitiveProps } from "reka-ui";
import { Primitive } from "reka-ui";
import { computed, type HTMLAttributes } from "vue";
import { useCommand } from ".";
import { useNuxtApp } from "nuxt/app";

const { $cn } = useNuxtApp();

const props = defineProps<
  PrimitiveProps & { class?: HTMLAttributes["class"] }
>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});

const { filterState } = useCommand();
const isRender = computed(
  () => !!filterState.search && filterState.filtered.count === 0,
);
</script>

<template>
  <Primitive
    v-if="isRender"
    v-bind="delegatedProps"
    :class="$cn('py-6 text-center text-sm', props.class)"
  >
    <slot />
  </Primitive>
</template>
