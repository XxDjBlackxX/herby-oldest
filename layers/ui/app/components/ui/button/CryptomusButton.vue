<script lang="ts" setup>
import { Primitive } from "reka-ui";
import { useNuxtApp } from "nuxt/app";
import type { ButtonProps, ButtonEmits } from ".";

const { $cn, $onClick } = useNuxtApp();

interface Props extends ButtonProps {}
interface Emits extends ButtonEmits {}

const props = withDefaults(defineProps<Props>(), {
  as: "button",
  class: "",
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
        'transition-all flex items-center justify-center gap-2 rounded-primary font-medium text-sm border border-white bg-black text-white',
        props.class,
      )
    "
    @click="
      $onClick({
        to,
        external,
        disabled: props.as == 'span',
        callback: () => emits('click'),
      })
    "
  >
    <IconCryptomus :size="24" />
    Cryptomus
  </Primitive>
</template>
