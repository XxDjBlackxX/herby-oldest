<script lang="ts" setup>
import { DrawerTrigger, type DrawerTriggerProps } from "vaul-vue";
import { type HTMLAttributes, computed } from "vue";

interface Props extends DrawerTriggerProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<Props>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});
</script>

<template>
  <DrawerTrigger v-bind="delegatedProps" :class="props.class">
    <slot />
  </DrawerTrigger>
</template>
