<script lang="ts" setup>
import {
  type DefaultButtonVariants,
  type ButtonProps,
  type ButtonEmits,
  defaultButtonVariants,
} from ".";
import { Primitive } from "reka-ui";
import { useNuxtApp } from "nuxt/app";

const { $cn, $onClick } = useNuxtApp();

interface Props extends ButtonProps {
  variant?: DefaultButtonVariants["variant"];
  shape?: DefaultButtonVariants["shape"];
  align?: DefaultButtonVariants["align"];
  orientation?: DefaultButtonVariants["orientation"];
}
interface Emits extends ButtonEmits {}

const props = withDefaults(defineProps<Props>(), {
  as: "button",
  class: "w-full",
  variant: "primary",
  disabled: false,
  to: null,
  waiting: false,
});
const emits = defineEmits<Emits>();
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    :class="
      $cn(
        defaultButtonVariants({ variant, shape, align, orientation }),
        props.class,
      )
    "
    :disabled="disabled || waiting"
    @click="
      $onClick({
        to,
        external,
        disabled: props.as == 'span',
        callback: () => emits('click'),
      })
    "
  >
    <IconLoader v-if="props.waiting" :size="20" />
    <slot v-else />
  </Primitive>
</template>
