<script lang="ts" setup>
import type { FileEditorProps, FileEditorEmits } from ".";
import { Button } from "../button";
import { AudioPlayer, VideoPlayer } from "../player";
import WaveSurfer from "wavesurfer.js";
import { getCssVariable } from "./utils";
import { useVModels, tryOnMounted } from "@vueuse/core";
import { ref, computed, watch, onUnmounted } from "vue";

const { formatDuration, getPreviewURL } = useString();

const props = withDefaults(defineProps<FileEditorProps>(), {
  maxSpacing: 10,
  minSpacing: 1,
});
const emits = defineEmits<FileEditorEmits>();
useVModels(props, emits);

const currentTime = ref(0);
const playing = ref(false);
const duration = ref(0);

const slider = ref<[number, number]>([0, props.maxSpacing]);

const isAudio = computed(() => {
  return props.file instanceof File
    ? props.file.type.startsWith("audio")
    : false;
});

const previewURL = computed(() => getPreviewURL(props.file));
const spacings = computed(() => slider.value.map(formatDuration));

const updateSpacing = (index: number, direction: "increase" | "decrease") => {
  const change = direction === "increase" ? 1 : -1;
  const [start, end] = slider.value;
  slider.value = index === 0 ? [start + change, end] : [start, end + change];
};

const handleSpacing = (
  newSlider: [number, number],
  oldSlider: [number, number],
) => {
  const [newStart, newEnd] = newSlider;
  const spacingLength = newEnd - newStart;

  if (
    spacingLength < props.minSpacing ||
    newStart < 0 ||
    newEnd > duration.value
  ) {
    slider.value = oldSlider;
    return;
  }

  if (spacingLength > props.maxSpacing) {
    slider.value =
      newStart < oldSlider[0]
        ? [newStart, newStart + props.maxSpacing]
        : [newEnd - props.maxSpacing, newEnd];
  } else {
    currentTime.value = newStart;
  }

  emits("update:spacing", slider.value);
};

watch(slider, handleSpacing);

const wavesurferRef = ref<any>(null);

tryOnMounted(() => {
  const htmlElement = document.documentElement;
  const bodyElement = document.body;

  const progressColor = `hsl(${getCssVariable(bodyElement, "--primary-600")})`;
  const waveColor = `hsl(${getCssVariable(htmlElement, "--surface-300")})`;

  wavesurferRef.value = WaveSurfer.create({
    container: "#waveform",
    waveColor,
    progressColor,
    cursorWidth: 0,
    height: 100,
    normalize: true,
    barAlign: "bottom",
    barWidth: 10,
    interact: false,
  });

  wavesurferRef.value.load(previewURL.value as string);
  wavesurferRef.value.on("ready", () => {
    const currentDuration = Math.floor(wavesurferRef.value.getDuration());
    /**@ts-ignore */
    slider.value =
      props.maxSpacing >= currentDuration
        ? [0, currentDuration]
        : props.spacing;
    duration.value = currentDuration;
  });
});

onUnmounted(() => {
  wavesurferRef.value?.destroy();
});
</script>

<template>
  <div
    v-if="previewURL"
    role="main"
    class="flex flex-col items-center gap-5 w-full"
  >
    <!-- Media Player -->
    <AudioPlayer
      v-if="isAudio"
      :src="previewURL"
      v-model:currentTime="currentTime"
      v-model:duration="duration"
      v-model:playing="playing"
    />
    <VideoPlayer
      v-else
      :src="previewURL"
      v-model:currentTime="currentTime"
      v-model:duration="duration"
      v-model:playing="playing"
    />
    <!-- Slider -->
    <div class="relative flex flex-col items-center w-full">
      <div id="waveform" class="w-full"></div>
      <UiSlider
        v-model="slider"
        :min="0"
        :step="1"
        :max="duration"
        class="absolute -bottom-3 z-10"
      />
    </div>
    <!-- Bottom Controls -->
    <div role="list" class="flex items-center gap-10">
      <div :class="$style.spacingControl">
        <button
          :class="$style.controlButton"
          @click="updateSpacing(0, 'decrease')"
        >
          <IconMinus :size="16" />
        </button>
        <div :class="$style.spacingDisplay">
          {{ spacings[0] }}
        </div>
        <button
          :class="$style.controlButton"
          @click="updateSpacing(0, 'increase')"
        >
          <IconPlus :size="16" />
        </button>
      </div>
      <Button shape="nds" variant="secondary" @click="playing = !playing">
        <IconPause v-if="playing" :size="20" />
        <IconPlay v-else :size="20" />
      </Button>
      <div :class="$style.spacingControl">
        <button
          :class="$style.controlButton"
          @click="updateSpacing(1, 'decrease')"
        >
          <IconMinus :size="16" />
        </button>
        <div :class="$style.spacingDisplay">
          {{ spacings[1] }}
        </div>
        <button
          :class="$style.controlButton"
          @click="updateSpacing(1, 'increase')"
        >
          <IconPlus :size="16" />
        </button>
      </div>
    </div>
  </div>
  <div
    v-else
    class="grid place-items-center w-full rounded-primary py-20 pointer-events-none border border-surface-300 bg-surface-100"
  >
    <IconLoader :size="30" />
  </div>
</template>

<style module scoped>
.controlButton {
  @apply transition-all text-typography-500 hover:text-typography-50 scale-100 hover:scale-[1.1];
}

.spacingDisplay {
  @apply px-2 py-2 rounded-primary font-light bg-surface-100;
}

.spacingControl {
  @apply flex items-center gap-2;
}
</style>
