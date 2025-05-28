<script setup lang="ts">
import {
  useForwardPropsEmits,
  HoverCardRoot,
  type HoverCardRootEmits,
  type HoverCardRootProps,
} from "reka-ui";

const props = withDefaults(defineProps<HoverCardRootProps>(), {});
const emits = defineEmits<HoverCardRootEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <HoverCardRoot v-bind="forwarded">
    <slot />
  </HoverCardRoot>
</template>
