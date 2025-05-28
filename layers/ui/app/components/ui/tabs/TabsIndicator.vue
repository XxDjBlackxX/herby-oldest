<script setup lang="ts">
import { TabsIndicator, type TabsIndicatorProps } from "reka-ui";
import { computed } from "vue";

const props = defineProps<TabsIndicatorProps>();

const delegatedProps = computed(() => {
  const { ...delegated } = props;

  return delegated;
});
</script>

<template>
  <TabsIndicator
    v-bind="delegatedProps"
    class="flex flex-col items-center absolute px-2 left-0 group-data-[variant=default]:bottom-0 group-data-[variant=selectable]:top-0 z-10 pointer-events-none w-[--reka-tabs-indicator-size] translate-x-[--reka-tabs-indicator-position] rounded-full transition-[width,transform]"
  >
    <div class="w-[30%] h-[2px] bg-primary-500 rounded-full" />
    <div
      class="w-[50%] h-[10px] bg-primary-500 blur-xl group-data-[variant=default]:hidden"
    />
  </TabsIndicator>
</template>
