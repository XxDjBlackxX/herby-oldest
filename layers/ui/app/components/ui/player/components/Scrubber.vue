<script setup lang="ts">
import { useNuxtApp } from "nuxt/app";
import { ref, watch } from "vue";
import { useVModel } from "@vueuse/core";

const { $cn } = useNuxtApp();

interface Props {
  min?: number;
  max?: number;
  secondary?: number;
  modelValue: number;
  class?: string;
  frame?: boolean;
  scrubbing?: boolean;
  orientation?: "vertical" | "horizontal";
}

interface Emits {
  "update:modelValue": number[];
}

const props = withDefaults(defineProps<Props>(), {
  min: 0,
  max: 100,
  secondary: 0,
  orientation: "horizontal",
  scrubbing: false,
});
const emits = defineEmits<Emits>();

const scrubber = ref();
const scrubbing = ref(false);
const pendingValue = ref(0);

useEventListener("mouseup", () => (scrubbing.value = false));

const value = useVModel(props, "modelValue", emits);
const { elementX, elementY, elementWidth, elementHeight } =
  useMouseInElement(scrubber);

watch([scrubbing, elementX, elementY], () => {
  const progress =
    props.orientation === "vertical"
      ? Math.max(0, Math.min(1, 1 - elementY.value / elementHeight.value))
      : Math.max(0, Math.min(1, elementX.value / elementWidth.value));

  pendingValue.value = progress * props.max;
  if (scrubbing.value) value.value = pendingValue.value;
});
</script>

<template>
  <div
    ref="scrubber"
    :class="
      $cn(
        'relative rounded cursor-pointer select-none',
        props.class,
        props.frame ? 'bg-surface-100 p-1' : 'bg-surface-800',
      )
    "
    @mousedown="scrubbing = true"
  >
    <div class="relative overflow-hidden h-full w-full rounded">
      <div
        class="min-h-full absolute opacity-30 left-0 top-0 bg-primary-500 min-w-full rounded"
        :style="{
          transform: `${orientation === 'vertical' ? 'translateY' : 'translateX'}(${orientation === 'vertical' ? 100 - (secondary / max) * 100 : (secondary / max) * 100 - 100}%)`,
        }"
      />
      <div
        class="relative min-h-full min-w-full bg-primary-500 rounded"
        :style="{
          transform: `${orientation === 'vertical' ? 'translateY' : 'translateX'}(${orientation === 'vertical' ? 100 - (value / max) * 100 : (value / max) * 100 - 100}%)`,
        }"
      />
    </div>
    <div
      class="transition-all absolute inset-0 hover:opacity-100 opacity-0"
      :class="{ '!opacity-100': scrubbing }"
    >
      <slot
        :pending-value="pendingValue"
        :position="`${Math.max(0, Math.min(elementX, elementWidth))}px`"
      />
    </div>
  </div>
</template>
