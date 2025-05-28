<script setup lang="ts">
import CheckboxRoot from "./CheckboxRoot.vue";
import CheckboxIndicator from "./CheckboxIndicator.vue";

import { useForwardPropsEmits } from "reka-ui";
import type { CheckboxRootProps, CheckboxRootEmits } from "reka-ui";
import type { HTMLAttributes } from "vue";

interface Props extends CheckboxRootProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<Props>();
const emits = defineEmits<CheckboxRootEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <CheckboxRoot v-bind="forwarded">
    <CheckboxIndicator />
  </CheckboxRoot>
</template>
