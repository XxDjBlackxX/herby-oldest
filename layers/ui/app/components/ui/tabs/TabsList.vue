<script setup lang="ts">
import { ScrollAreaRoot, ScrollAreaViewport } from "../scroll-area";
import { TabsList, type TabsListProps } from "reka-ui";
import Indicator from "./TabsIndicator.vue";
import { computed } from "vue";

const props = defineProps<TabsListProps>();

const delegatedProps = computed(() => {
  const { ...delegated } = props;

  return delegated;
});
</script>

<template>
  <ScrollAreaRoot class="w-full h-full">
    <ScrollAreaViewport
      class="md:group-data-[align=center]:flex md:group-data-[align=center]:items-center md:group-data-[align=center]:justify-center max-w-full h-full"
    >
      <TabsList
        v-bind="delegatedProps"
        class="relative shrink-0 gap-2 flex items-center group-data-[align=center]:justify-center group-data-[variant=selectable]:w-fit group-data-[variant=selectable]:rounded-primary group-data-[variant=selectable]:p-2 group-data-[variant=selectable]:bg-surface-100 group-data-[variant=selectable]:border group-data-[variant=selectable]:border-surface-300 group-data-[variant=default]:border-b group-data-[variant=default]:border-surface-500 overflow-hidden"
      >
        <Indicator />
        <slot />
      </TabsList>
    </ScrollAreaViewport>
  </ScrollAreaRoot>
</template>
