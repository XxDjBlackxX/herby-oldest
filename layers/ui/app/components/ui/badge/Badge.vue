<script lang="ts" setup>
import type { HTMLAttributes } from "vue";
import { type BadgeVariants, badgeVariants } from ".";
import { useNuxtApp } from "nuxt/app";

const { $cn } = useNuxtApp();

interface Props {
  variant?: BadgeVariants["variant"];
  class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<Props>(), {
  class: "",
  variant: "canceled",
});
</script>

<template>
  <span :class="$cn(badgeVariants({ variant: props.variant }), props.class)">
    <IconShield v-if="variant == 'admin'" :size="16" />
    <IconUser v-if="variant == 'user'" :size="16" />
    <IconEye v-if="variant == 'moderator'" :size="16" />
    <IconTvMinimal v-if="variant == 'broadcaster'" :size="16" />
    <IconGlasses v-if="variant == 'supervisory'" :size="16" />
    <IconPiggyBank v-if="variant == 'financier'" :size="16" />
    <slot />
  </span>
</template>
