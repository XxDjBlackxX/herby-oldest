<script setup lang="ts">
import type { LinkPreviewProps } from ".";
import { encode } from "qss";
import { computed, ref } from "vue";

const width = 200;
const height = 100;

const props = withDefaults(defineProps<LinkPreviewProps>(), {
  quality: 50,
});

const isExpanded = ref(false);

const src = computed(() => {
  if (!props.isStatic) {
    const params = encode({
      url: props.url,
      screenshot: true,
      meta: false,
      embed: "screenshot.url",
      colorScheme: "dark",
      "viewport.isMobile": true,
      "viewport.deviceScaleFactor": 1,
      "viewport.width": width * 4,
      "viewport.height": height * 4,
    });
    return `https://api.microlink.io/?${params}`;
  } else {
    return props.imageSrc;
  }
});

const handleMouseEnter = () => (isExpanded.value = true);
const handleMouseLeave = () => (isExpanded.value = false);
</script>

<template>
  <div
    @mouseover="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    class="relative flex flex-col items-center"
  >
    <UiHrefButton :href="url" target="_blank">
      <slot />
    </UiHrefButton>

    <div
      :aria-expanded="isExpanded"
      class="transition-all max-md:hidden rounded-primary absolute top-6 z-10 bg-surface-100 border border-surface-300 opacity-0 -translate-y-2 pointer-events-none aria-expanded:translate-y-0 aria-expanded:opacity-100 aria-expanded:pointer-events-auto"
    >
      <NuxtLink :to="url">
        <img
          :src="src"
          :quality="quality"
          :style="{
            minWidth: $formatSize(width),
            maxWidth: $formatSize(width),
            minHeight: $formatSize(height),
            maxHeight: $formatSize(height),
          }"
          class="object-cover rounded-primary border-none outline-none"
          alt="preview image"
        />
      </NuxtLink>
    </div>
  </div>
</template>
