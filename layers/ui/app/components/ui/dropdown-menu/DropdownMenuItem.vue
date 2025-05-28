<script lang="ts" setup>
import { useNuxtApp, useRoute } from "nuxt/app";
import { DropdownMenuItem, Primitive, type PrimitiveProps } from "reka-ui";
import { type Component, type HTMLAttributes, ref, watch } from "vue";
import { type DropdownMenuItemVariants, dropdownMenuItemVariants } from ".";

const { $onClick, $cn } = useNuxtApp();

interface Props extends PrimitiveProps {
  as?: Component | "span";
  class?: HTMLAttributes["class"];
  to?: string;
  variant?: DropdownMenuItemVariants["variant"];
  external?: boolean;
}

interface Emits {
  click: void[];
}

const props = withDefaults(defineProps<Props>(), {
  as: DropdownMenuItem,
});
const emits = defineEmits<Emits>();

const route = useRoute();
const isActive = ref(false);

if (props.to) {
  watch(
    () => route.fullPath,
    (v) => (isActive.value = v == props.to),
    { immediate: true },
  );
}
</script>

<template>
  <Primitive
    :as="as"
    :class="$cn(dropdownMenuItemVariants({ variant }), props.class)"
    :data-active="isActive"
    @click="
      $onClick({
        to,
        external,
        disabled: props.as == 'span',
        callback: () => emits('click'),
      })
    "
  >
    <slot />
  </Primitive>
</template>
