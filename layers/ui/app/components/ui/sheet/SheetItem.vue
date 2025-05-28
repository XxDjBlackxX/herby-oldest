<script lang="ts" setup>
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useNuxtApp } from "nuxt/app";

const { $cn } = useNuxtApp();

export type Props = {
  to: string;
  here?: boolean;
};

const props = defineProps<Props>();

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
  <NuxtLink
    :to="props.to"
    :class="
      $cn(
        'transition-all flex items-center justify-between w-full py-2 px-2 cursor-pointer whitespace-nowrap rounded-primary group font-medium bg-transparent',
        isActive
          ? 'bg-primary-500 hover:bg-primary-600 text-primary-foreground'
          : 'text-typography-500 hover:bg-primary-500 hover:text-primary-foreground',
      )
    "
  >
    <span class="flex items-center gap-3">
      <slot />
    </span>
  </NuxtLink>
</template>
