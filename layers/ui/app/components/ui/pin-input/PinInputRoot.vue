<script lang="ts" setup>
import {
  PinInputRoot,
  type PinInputRootEmits,
  type PinInputRootProps,
  useForwardPropsEmits,
} from "reka-ui";
import { type HTMLAttributes } from "vue";
import { useNuxtApp } from "nuxt/app";

const { $cn } = useNuxtApp();

interface Props extends PinInputRootProps {
  class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: () => [],
});
const emits = defineEmits<PinInputRootEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <PinInputRoot
    v-bind="forwarded"
    :class="
      $cn(
        'flex flex-wrap items-center justify-between w-full gap-5',
        props.class,
      )
    "
  >
    <slot />
  </PinInputRoot>
</template>
