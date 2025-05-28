<script setup lang="ts">
import {
  useForwardPropsEmits,
  SplitterPanel,
  type SplitterPanelEmits,
  type SplitterPanelProps,
} from "reka-ui";

const props = defineProps<SplitterPanelProps>();
const emits = defineEmits<SplitterPanelEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <SplitterPanel v-bind="forwarded">
    <slot />
  </SplitterPanel>
</template>
