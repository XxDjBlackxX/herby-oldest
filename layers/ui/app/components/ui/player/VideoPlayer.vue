<script lang="ts" setup>
import Scrubber from "./components/Scrubber.vue";
import type { VideoPlayerProps, VideoPlayerEmits } from ".";
import { useNuxtApp } from "nuxt/app";
import { ref, watch, computed, reactive } from "vue";
import { useMediaControls, useVModels, useFullscreen } from "@vueuse/core";

const { $cn } = useNuxtApp();

const props = withDefaults(defineProps<VideoPlayerProps>(), { class: "" });
const emits = defineEmits<VideoPlayerEmits>();

const { formatDuration, getPreviewURL } = useString();
const video = ref<HTMLVideoElement>();
const videoBody = ref<HTMLDivElement>();
const controls = ref<HTMLDivElement>();
const previewURL = computed(() => getPreviewURL(props.src));

const {
  playing,
  volume,
  muted,
  waiting,
  duration,
  currentTime,
  isPictureInPicture,
  supportsPictureInPicture,
  togglePictureInPicture,
} = useMediaControls(video, { src: previewURL.value as string });

const state = reactive({ controls: false });
const { isFullscreen, toggle: toggleFullscreen } = useFullscreen(videoBody);

const vModel = useVModels(props, emits);

watch(
  () => [playing, duration, currentTime],
  () => {
    if (typeof playing.value == "boolean") {
      vModel.playing.value = playing.value;
    }
    if (typeof currentTime.value == "number") {
      vModel.currentTime.value = currentTime.value;
    }
    if (typeof duration.value == "number") {
      vModel.duration.value = duration.value;
    }
  },
  { immediate: true, deep: true },
);

watch(
  () => [vModel.currentTime.value, vModel.playing.value, vModel.duration.value],
  () => {
    if (typeof vModel.playing.value == "boolean") {
      playing.value = vModel.playing.value;
    }
    if (typeof vModel.currentTime.value == "number") {
      currentTime.value = vModel.currentTime.value;
    }
    if (typeof vModel.duration.value == "number") {
      duration.value = vModel.duration.value;
    }
  },
  { immediate: true, deep: true },
);

function togglePlay() {
  playing.value = !playing.value;
}

function skipTime(seconds: number) {
  currentTime.value += seconds;
}

function showControls() {
  state.controls = true;
}

function hideControls() {
  state.controls = false;
}

defineExpose({
  source: video,
  currentTime,
  playing,
});
</script>

<template>
  <div
    v-if="previewURL"
    :class="
      $cn('relative flex flex-col items-center outline-none', props.class)
    "
    tabindex="0"
    ref="videoBody"
    @keydown.prevent.space="togglePlay"
    @keydown.right="skipTime(10)"
    @keydown.left="skipTime(-10)"
    @mouseenter="showControls"
    @mouseleave="hideControls"
  >
    <video
      ref="video"
      crossorigin="anonymous"
      class="cursor-pointer rounded-primary"
      @click="togglePlay"
    />
    <div
      v-if="waiting"
      class="absolute inset-0 grid place-items-center pointer-events-none bg-black/20 text-white"
    >
      <IconLoader :size="30" />
    </div>
    <div
      ref="controls"
      :class="
        $cn(
          'transition-all absolute bottom-0 grid grid-cols-2 w-full p-2 rounded-b-xl bg-opacity-40 backdrop-blur-sm bg-black',
          state.controls ? 'opacity-100' : 'opacity-0',
        )
      "
    >
      <Scrubber
        v-model="currentTime"
        :max="duration"
        class="w-full h-2 mb-2 col-span-2"
      >
        <template #default="{ position, pendingValue }">
          <div
            class="absolute z-50 whitespace-nowrap transform -translate-x-1/2 font-medium rounded px-2 bottom-0 mb-4 py-1 text-xs bg-surface-100 border border-surface-300"
            :style="{ left: position }"
          >
            {{ formatDuration(pendingValue) }}
          </div>
        </template>
      </Scrubber>

      <ul :class="$style.optionsLeft">
        <li>
          <button :class="$style.controlButton" @click="togglePlay">
            <IconPause v-if="playing" :size="16" />
            <IconPlay v-else :size="16" />
          </button>
        </li>
        <li>
          <p
            class="flex items-center gap-1 whitespace-nowrap text-sm font-light text-white"
          >
            {{ formatDuration(currentTime) }} / {{ formatDuration(duration) }}
          </p>
        </li>
        <li class="w-full">
          <div
            class="relative flex flex-col items-center gap-2 w-fit cursor-pointer group"
          >
            <button :class="$style.controlButton" @click="muted = !muted">
              <IconVolumeX v-if="muted" :size="16" />
              <IconVolume2 v-else :size="16" />
            </button>
            <Scrubber
              v-model="volume"
              :min="0"
              :max="1"
              frame
              orientation="vertical"
              class="transition-all absolute w-4 h-[100px] opacity-0 group-hover:opacity-100 bottom-0 group-hover:bottom-8 pointer-events-none group-hover:pointer-events-auto"
            />
          </div>
        </li>
      </ul>
      <ul :class="$style.optionsRight">
        <li>
          <button
            v-if="supportsPictureInPicture"
            :class="$style.controlButton"
            @click="togglePictureInPicture"
          >
            <IconGalleryThumbnails v-if="isPictureInPicture" :size="16" />
            <IconGalleryVerticalEnd v-else :size="16" />
          </button>
        </li>
        <li>
          <button :class="$style.controlButton" @click="toggleFullscreen">
            <IconMinimize v-if="isFullscreen" :size="16" />
            <IconMaximize v-else :size="16" />
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped module>
.controlButton {
  @apply transition-all p-2 rounded-full text-white hover:bg-surface-300 active:scale-[1.1];
}

.optionsLeft,
.optionsRight {
  display: flex;
  align-items: center;
  gap: 8px;
}

.optionsLeft {
  justify-content: start;
}

.optionsRight {
  justify-content: end;
}
</style>
