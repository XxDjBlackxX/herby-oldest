<script lang="ts" setup>
import type { AnchorHTMLAttributes } from "vue";
import {
  type HrefButtonVariants,
  linkButtonVariants,
  type ButtonProps,
} from ".";

interface Props
  extends /* @vue-ignore */ Partial<AnchorHTMLAttributes & ButtonProps> {
  variant?: HrefButtonVariants["variant"];
}

const props = withDefaults(defineProps<Props>(), {
  class: "",
  variant: "primary",
  disabled: false,
  waiting: false,
});
</script>

<template>
  <a
    :class="$cn(linkButtonVariants({ variant }), props.class)"
    :disabled="props.disabled"
    :href="props.href"
    :target="props.target"
  >
    <IconLoader v-if="props.waiting" :size="20" />
    <slot v-else />
  </a>
</template>
