<script setup lang="ts">
import {
  useForwardPropsEmits,
  SplitterResizeHandle,
  type SplitterResizeHandleEmits,
  type SplitterResizeHandleProps,
} from "reka-ui";

const props = defineProps<SplitterResizeHandleProps>();
const emits = defineEmits<SplitterResizeHandleEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <SplitterResizeHandle v-bind="forwarded">
    <slot />
  </SplitterResizeHandle>
</template>
