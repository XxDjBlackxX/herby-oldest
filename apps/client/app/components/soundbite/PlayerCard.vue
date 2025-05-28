<script lang="ts" setup>
import type { Soundbite } from "@repo/client-types";

type PluginType = "like" | "author";

interface Props {
  item: Soundbite;
  width?: number | string;
  height?: number | string;
  plugins?: PluginType[];
}

withDefaults(defineProps<Props>(), {
  plugins: (): PluginType[] => ["like", "author"],
});
</script>

<template>
  <UiImage
    v-if="item"
    :src="item.thumbnail"
    :width="width"
    :height="height"
    variant="hoverable"
    inside-align="start-bottom"
  >
    <template #inside>
      <div class="absolute top-0 right-0 m-2 z-0">
        <SoundbiteRippleMenu :item="item" />
      </div>

      <div class="flex flex-col items-start w-full gap-2">
        <div class="flex flex-col items-start gap-y-0.5">
          <h6
            class="font-bold text-lg break-all text-start leading-5 text-white"
          >
            {{ item.title }}
          </h6>
          <div class="flex items-center text-white">
            <SoundbiteLikeButton v-if="plugins.includes('like')" :item="item" />
            <template v-if="plugins.includes('author')">
              <IconDot :size="14" />
              <SharedProfileHoverCard :id="item.author.id">
                {{ item.author.username }}
              </SharedProfileHoverCard>
            </template>
          </div>
        </div>
        <UiAudioPlayer :src="item.audio" />
      </div>
    </template>
  </UiImage>
</template>
