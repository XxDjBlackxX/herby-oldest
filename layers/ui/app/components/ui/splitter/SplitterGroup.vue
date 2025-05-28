<script setup lang="ts">
import {
  useForwardPropsEmits,
  SplitterGroup,
  type SplitterGroupEmits,
  type SplitterGroupProps,
} from "reka-ui";

const props = defineProps<SplitterGroupProps>();
const emits = defineEmits<SplitterGroupEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <SplitterGroup v-bind="forwarded">
    <slot />
  </SplitterGroup>
</template>
