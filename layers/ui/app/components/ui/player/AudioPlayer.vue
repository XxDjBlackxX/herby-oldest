<script lang="ts" setup>
import Scrubber from "./components/Scrubber.vue";
import type { AudioPlayerProps, AudioPlayerEmits } from ".";
import { useVModels, useMediaControls, onClickOutside } from "@vueuse/core";
import { ref, computed, watch } from "vue";
import { useNuxtApp } from "nuxt/app";

const { $cn } = useNuxtApp();
const audioRef = ref();
const props = defineProps<AudioPlayerProps>();
const emits = defineEmits<AudioPlayerEmits>();

const { formatDuration, formatDownloadLink, getPreviewURL } = useString();
const previewURL = computed(() => getPreviewURL(props.src));
const audio = new Audio(previewURL.value as string);
const { playing, waiting, duration, currentTime } = useMediaControls(audio, {
  src: previewURL.value as string,
});
const vModel = useVModels(props, emits);

onClickOutside(audioRef, () => {
  if (!playing.value) return;
  playing.value = false;
  currentTime.value = 0;
});

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
</script>

<template>
  <div
    v-if="previewURL"
    ref="audioRef"
    :class="
      $cn(
        'relative flex flex-col items-center group outline-none w-full',
        props.class,
      )
    "
  >
    <div
      v-if="waiting"
      class="absolute w-full h-full z-10 grid place-items-center pointer-events-auto rounded-primary bg-surface-50/50 backdrop-blur-sm"
    >
      <IconLoader :size="18" />
    </div>

    <div
      class="flex items-center justify-between w-full gap-2 px-2 py-1 rounded-primary bg-surface-100 border border-surface-300 music-pattern"
    >
      <ul :class="$style.optionsLeft">
        <li>
          <button @click="playing = !playing" :class="$style.controlButton">
            <IconPause v-if="playing" :size="16" />
            <IconPlay v-else :size="16" />
          </button>
        </li>
        <li class="w-full">
          <Scrubber v-model="currentTime" :max="duration" class="w-full h-2">
            <template #default="{ position, pendingValue }">
              <div
                class="absolute z-50 whitespace-nowrap transform -translate-x-1/2 font-medium rounded px-2 bottom-0 mb-4 py-1 text-xs bg-surface-100 border border-surface-300"
                :style="{ left: position }"
              >
                {{ formatDuration(pendingValue) }}
              </div>
            </template>
          </Scrubber>
        </li>
      </ul>
      <ul :class="$style.optionsRight">
        <li>
          <UiHrefButton
            :href="formatDownloadLink(previewURL)"
            target="_blank"
            variant="default"
          >
            <IconDownload :size="18" />
          </UiHrefButton>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped module>
.controlButton {
  @apply transition-all p-2 rounded-full hover:bg-surface-300 active:scale-[1.1];
}

.optionsLeft,
.optionsRight {
  display: flex;
  align-items: center;
  gap: 2px;
}

.optionsLeft {
  justify-content: start;
  width: 100%;
}

.optionsRight {
  justify-content: end;
}
</style>
