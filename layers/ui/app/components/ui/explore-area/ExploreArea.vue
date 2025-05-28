<script setup lang="ts">
import { ref } from "vue";
import { useNuxtApp } from "nuxt/app";

const { $cn } = useNuxtApp();
const isExplored = ref(false);

function onExplore() {
  if (isExplored.value) return;
  isExplored.value = true;
}
</script>

<template>
  <span :class="$cn('transition-all relative', isExplored ? 'p-0' : ' p-2')">
    <slot />
    <button
      type="button"
      :class="
        $cn(
          'transition-all absolute top-0 left-0 flex items-center justify-center gap-2 w-full h-full font-medium text-typography-500 hover:text-typography-50',
          isExplored
            ? 'backdrop-blur-none opacity-0 pointer-events-none'
            : ' backdrop-blur-sm opacity-100 pointer-events-auto',
        )
      "
      @click="onExplore"
    >
      <IconEye :size="16" />
      {{ $t("layers.ui.index.exploreArea") }}
    </button>
  </span>
</template>
