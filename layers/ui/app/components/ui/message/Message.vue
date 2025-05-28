<script lang="ts" setup>
import type { HTMLAttributes } from "vue";
import { type MessageVariants, messageVariants } from ".";
import { Primitive, type PrimitiveProps } from "reka-ui";
import { useNuxtApp } from "nuxt/app";

const { $cn } = useNuxtApp();

interface Props extends PrimitiveProps {
  type?: MessageVariants["type"];
  class?: HTMLAttributes["class"];
  visible?: boolean;
  label?: string;
}

const props = withDefaults(defineProps<Props>(), {
  as: "div",
  class: "",
  visible: true,
  label: "",
});
</script>

<template>
  <Primitive
    v-if="visible"
    :as="as"
    :as-child="asChild"
    :class="$cn(messageVariants({ type }), props.class)"
    v-auto-animate
  >
    <span
      v-if="props.type !== 'default'"
      class="flex items-center justify-center w-10 h-10"
    >
      <IconInfo v-if="props.type == 'info'" :size="20" />
      <IconCircleX v-if="props.type == 'error'" :size="20" />
      <IconCircleCheck v-if="props.type == 'success'" :size="20" />
    </span>
    <span>
      <template v-if="$slots.default">
        <slot />
      </template>
      <template v-else>{{ label }}</template>
    </span>
  </Primitive>
</template>
