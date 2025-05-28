<script setup lang="ts">
import {
  ContextMenuItem,
  type ContextMenuItemEmits,
  type ContextMenuItemProps,
  useForwardPropsEmits,
} from "reka-ui";
import { computed, type HTMLAttributes } from "vue";
import { useNuxtApp } from "nuxt/app";

const { $cn, $onClick } = useNuxtApp();

const props = defineProps<
  ContextMenuItemProps & {
    class?: HTMLAttributes["class"];
    inset?: boolean;
    to?: string;
    external?: boolean;
  }
>();
const emits = defineEmits<ContextMenuItemEmits & { click: void[] }>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});

const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<template>
  <ContextMenuItem
    v-bind="forwarded"
    :class="
      $cn(
        'transition-all relative flex cursor-pointer select-none items-center gap-2 rounded-primary font-medium px-2 py-1.5 text-sm outline-none text-typography-500 hover:bg-primary-500 hover:text-primary-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        inset && 'pl-8',
        props.class,
      )
    "
    @click="$onClick({ to, external, callback: () => emits('click') })"
  >
    <slot />
  </ContextMenuItem>
</template>
