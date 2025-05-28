<script setup lang="ts">
import {
  useForwardPropsEmits,
  TabsRoot,
  type TabsRootEmits,
  type TabsRootProps,
} from "reka-ui";

const props = withDefaults(
  defineProps<
    TabsRootProps & {
      variant?: "default" | "selectable";
      align?: "center" | "start";
    }
  >(),
  { variant: "default", align: "start" },
);
const emits = defineEmits<TabsRootEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <TabsRoot
    v-bind="forwarded"
    :data-variant="props.variant"
    :data-align="props.align"
    class="group flex flex-col w-full"
  >
    <slot />
  </TabsRoot>
</template>
