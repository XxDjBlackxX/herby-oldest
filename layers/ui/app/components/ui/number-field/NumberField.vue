<script setup lang="ts">
import type { NumberFieldRootEmits, NumberFieldRootProps } from "reka-ui";
import {
  NumberFieldRoot,
  NumberFieldInput,
  useForwardPropsEmits,
} from "reka-ui";
import { type HTMLAttributes } from "vue";
import { inputVariants, type InputVariants } from "../input/variants";
import NumberFieldContent from "./NumberFieldContent.vue";
import NumberFieldDecrement from "./NumberFieldDecrement.vue";
import NumberFieldIncrement from "./NumberFieldIncrement.vue";

const props = defineProps<
  NumberFieldRootProps & {
    class?: HTMLAttributes["class"];
    size?: InputVariants["size"];
  }
>();
const emits = defineEmits<NumberFieldRootEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <NumberFieldRoot v-bind="forwarded">
    <NumberFieldContent>
      <NumberFieldInput
        data-slot="input"
        united="input"
        :class="$cn('text-center', inputVariants({ size }), props.class)"
      />
      <NumberFieldDecrement />
      <NumberFieldIncrement />
    </NumberFieldContent>
  </NumberFieldRoot>
</template>
