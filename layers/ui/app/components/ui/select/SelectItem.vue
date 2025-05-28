<script lang="ts" setup>
import {
  SelectItem,
  type SelectItemProps,
  useForwardPropsEmits,
  SelectItemText,
  SelectItemIndicator,
} from "reka-ui";
import { type HTMLAttributes } from "vue";

interface Props extends SelectItemProps {
  class?: HTMLAttributes["class"];
  disabled?: boolean;
}

interface Emits {
  interaction: void[];
}

const props = defineProps<Props>();
const emits = defineEmits<Emits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <SelectItem
    v-bind="forwarded"
    class="transition-all relative cursor-pointer flex items-center justify-start overflow-hidden w-full p-2 border-none outline-none rounded-primary gap-2 font-medium whitespace-nowrap hover:bg-primary-500 text-typography-500 hover:text-primary-foreground data-[disabled]:pointer-events-none data-[state=checked]:bg-primary-500 data-[state=checked]:text-primary-foreground data-[state=checked]:hover:bg-primary-600"
    :value="value"
  >
    <SelectItemText>
      <slot />
    </SelectItemText>
    <SelectItemIndicator
      class="absolute right-3 w-[25px] inline-flex items-center justify-center bg-primary-500 p-1 rounded-primary"
    >
      <IconCheck :size="16" />
    </SelectItemIndicator>
  </SelectItem>
</template>
