<script setup lang="ts">
import { ref, type HTMLAttributes, computed } from "vue";
import { useNuxtApp } from "nuxt/app";
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
} from "../context-menu";
import { AvatarFallback, AvatarImage, AvatarRoot } from "reka-ui";

const isVisible = ref(false);

const { $cn, $formatSize } = useNuxtApp();
const props = withDefaults(
  defineProps<{
    class?: HTMLAttributes["class"];
    width?: string | number;
    height?: string | number;
    src: string;
    shape?: "square" | "circle";
    alt?: string;
    variant?: "hoverable" | "normal";
    insideAlign?: "center" | "start" | "start-bottom";
  }>(),
  {
    shape: "square",
    variant: "normal",
    insideAlign: "center",
  },
);

defineEmits(["click"]);

const styleProps = computed(() => ({
  minWidth: props.width ? $formatSize(props.width) : undefined,
  maxWidth: props.width ? $formatSize(props.width) : undefined,
  minHeight: props.height ? $formatSize(props.height) : undefined,
  maxHeight: props.height ? $formatSize(props.height) : undefined,
}));
</script>

<template>
  <ContextMenu>
    <ContextMenuTrigger
      :style="styleProps"
      :data-visible="isVisible"
      :data-shape="props.shape"
      :class="
        $cn(
          'relative group flex overflow-hidden data-[shape=circle]:rounded-full data-[shape=square]:rounded-primary',
          props.class,
        )
      "
      @mouseenter="isVisible = true"
      @mouseleave="isVisible = false"
      @click="$emit('click')"
    >
      <div
        v-if="variant == 'hoverable'"
        :data-align="props.insideAlign"
        class="transition-all absolute top-0 left-0 p-2 z-10 group-data-[visible=false]:pointer-events-none group-data-[visible=true]:pointer-events-auto flex data-[align=start-bottom]:items-end data-[align=start-bottom]:justify-start data-[align=center]:items-center data-[align=center]:justify-center w-full h-full bg-black group-data-[visible=false]:bg-opacity-0 group-data-[visible=true]:bg-opacity-40 group-data-[visible=false]:opacity-0 group-data-[visible=true]:group-hover:opacity-100"
      >
        <slot name="inside" />
      </div>
      <AvatarRoot
        class="inline-flex items-center justify-center bg-surface-300 w-full aspect-square z-0 pointer-events-none"
      >
        <AvatarImage
          :src="props.src"
          :alt="props.alt"
          class="w-full h-full object-cover"
        />
        <AvatarFallback
          class="flex items-center justify-center w-full aspect-square"
        >
          <template v-if="$slots.fallback">
            <slot name="fallback" />
          </template>
          <IconLoader v-else class="w-[30%] h-[30%]" />
        </AvatarFallback>
      </AvatarRoot>
    </ContextMenuTrigger>
    <ContextMenuContent>
      <ContextMenuItem :to="props.src" external>
        <IconLink :size="16" />
        {{ $t("layers.ui.index.image.go") }}
      </ContextMenuItem>
    </ContextMenuContent>
  </ContextMenu>
</template>
