<script setup lang="ts">
import type { ComboboxContentEmits, ComboboxContentProps } from "reka-ui";
import {
  ComboboxContent,
  ComboboxPortal,
  ComboboxViewport,
  useForwardPropsEmits,
} from "reka-ui";
import { computed, type HTMLAttributes } from "vue";
import { useNuxtApp } from "nuxt/app";
import SuperSelectInput from "./SuperSelectInput.vue";
import SuperSelectEmpty from "./SuperSelectEmpty.vue";
import SuperSelectSeparator from "./SuperSelectSeparator.vue";
import ScrollAreaRoot from "../scroll-area/ScrollAreaRoot.vue";
import ScrollAreaViewport from "../scroll-area/ScrollAreaViewport.vue";

const { $cn } = useNuxtApp();

const props = withDefaults(
  defineProps<ComboboxContentProps & { class?: HTMLAttributes["class"] }>(),
  {
    position: "popper",
    align: "center",
    sideOffset: 4,
  },
);
const emits = defineEmits<ComboboxContentEmits>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});

const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<template>
  <ComboboxPortal>
    <ComboboxContent
      v-bind="forwarded"
      :class="
        $cn(
          'flex flex-col z-[100] min-w-32 w-[--reka-combobox-trigger-width] rounded-primary p-3 border bg-surface-100 border-surface-300 shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
          props.class,
        )
      "
    >
      <ComboboxViewport class="flex flex-col gap-y-2 w-full">
        <SuperSelectInput
          class=""
          :placeholder="$t('layers.ui.index.superSelect.inputPlaceHolder')"
        />

        <SuperSelectSeparator />
        <SuperSelectEmpty>
          <IconSearchX :size="40" />
        </SuperSelectEmpty>

        <ScrollAreaRoot class="w-full h-full">
          <ScrollAreaViewport class="w-full max-h-[300px]">
            <slot
          /></ScrollAreaViewport>
        </ScrollAreaRoot>
      </ComboboxViewport>
    </ComboboxContent>
  </ComboboxPortal>
</template>
