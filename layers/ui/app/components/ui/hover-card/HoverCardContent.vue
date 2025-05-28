<script setup lang="ts">
import {
  HoverCardContent,
  HoverCardPortal,
  type HoverCardContentProps,
} from "reka-ui";
import { type HTMLAttributes, computed } from "vue";
import { useNuxtApp } from "nuxt/app";

const { $cn } = useNuxtApp();

interface Props extends HoverCardContentProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<Props>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});
</script>

<template>
  <HoverCardPortal>
    <HoverCardContent
      v-bind="delegatedProps"
      :class="
        $cn(
          'data-[side=bottom]:animate-slide-up-and-fade data-[side=right]:animate-slide-left-and-fade data-[side=left]:animate-slide-right-and-fade data-[side=top]:animate-slide-down-and-fade transition-all p-2 z-50 rounded-primary border border-surface-300 bg-surface-100',
          props.class,
        )
      "
    >
      <slot />
    </HoverCardContent>
  </HoverCardPortal>
</template>
