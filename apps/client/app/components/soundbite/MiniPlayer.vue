<template>
  <UiImage
    :src="item.thumbnail"
    class="cursor-pointer w-12 h-12"
    inside-align="center"
    variant="hoverable"
  >
    <template #inside>
      <UiButton
        ref="buttonRef"
        variant="ghost"
        align="center"
        class="w-fit p-2"
        @click="playing = !playing"
      >
        <IconPause v-if="playing" :size="20" />
        <IconPlay v-else :size="20" />
      </UiButton>
    </template>
  </UiImage>
</template>

<script lang="ts" setup>
import type { Soundbite } from "@repo/client-types";

interface Props {
  item: Soundbite;
}

const props = defineProps<Props>();

const buttonRef = ref();
const audio = new Audio(props.item.audio);

const { playing, currentTime } = useMediaControls(audio, {
  src: props.item.audio,
});

onClickOutside(buttonRef, () => {
  if (!playing.value) return;
  playing.value = false;
  currentTime.value = 0;
});
</script>
