<script setup lang="ts">
import { HoverCardTrigger, type HoverCardTriggerProps } from "reka-ui";
import { type HTMLAttributes, computed } from "vue";
import { useNuxtApp } from "nuxt/app";

const { $cn } = useNuxtApp();

interface Props extends HoverCardTriggerProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<Props>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});
</script>

<template>
  <HoverCardTrigger
    v-bind="delegatedProps"
    :class="$cn('inline-block cursor-pointer outline-none', props.class)"
  >
    <slot />
  </HoverCardTrigger>
</template>
