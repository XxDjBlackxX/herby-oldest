<script lang="ts" setup>
import type { HTMLAttributes } from "vue";
import { RouterLink } from "vue-router";
import { Primitive, type PrimitiveProps } from "reka-ui";

const props = withDefaults(
  defineProps<PrimitiveProps & { class?: HTMLAttributes["class"] }>(),
  {
    as: RouterLink,
  },
);
</script>

<template>
  <Primitive :as="as" :as-child="asChild" :class="props.class">
    <slot />
  </Primitive>
</template>
