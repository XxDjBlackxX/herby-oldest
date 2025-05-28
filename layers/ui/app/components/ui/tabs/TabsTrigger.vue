<script setup lang="ts">
import { TabsTrigger, type TabsTriggerProps } from "reka-ui";
import { computed } from "vue";

const props = defineProps<TabsTriggerProps>();

const delegatedProps = computed(() => {
  const { ...delegated } = props;

  return delegated;
});
</script>

<template>
  <TabsTrigger
    v-bind="delegatedProps"
    class="transition-all z-0 p-4 whitespace-nowrap flex items-center justify-center gap-2 leading-none min-w-[100px] select-none outline-none cursor-pointer focus-visible:relative data-[state=active]:pointer-events-none text-sm font-medium group-data-[variant=default]:hover:bg-surface-400 group-data-[variant=default]:rounded-t-primary group-data-[variant=default]:focus:bg-transparent group-data-[variant=selectable]:rounded-primary group-data-[variant=selectable]:hover:bg-surface-300 group-data-[variant=selectable]:focus:bg-surface-300"
  >
    <slot />
  </TabsTrigger>
</template>
