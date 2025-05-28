<script lang="ts" setup>
import { Primitive, type PrimitiveProps } from "reka-ui";
import { type HTMLAttributes, computed } from "vue";
import { useNuxtApp } from "nuxt/app";

const { $cn } = useNuxtApp();

interface Props extends PrimitiveProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<Props>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;
  return delegated;
});
</script>

<template>
  <Primitive
    v-bind="delegatedProps"
    :class="$cn('flex items-center', props.class)"
  >
    <slot />
  </Primitive>
</template>
