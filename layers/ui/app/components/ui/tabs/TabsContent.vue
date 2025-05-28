<script setup lang="ts">
import { TabsContent, type TabsContentProps } from "reka-ui";
import { computed } from "vue";

const props = defineProps<TabsContentProps>();

const delegatedProps = computed(() => {
  const { ...delegated } = props;

  return delegated;
});
</script>

<template>
  <TabsContent
    v-bind="delegatedProps"
    class="grow mt-5 rounded-b-primary outline-none"
  >
    <slot />
  </TabsContent>
</template>
