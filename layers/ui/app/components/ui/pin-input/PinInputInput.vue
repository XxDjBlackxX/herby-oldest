<script lang="ts" setup>
import { PinInputInput, type PinInputInputProps } from "reka-ui";
import { type HTMLAttributes, computed } from "vue";
import { useNuxtApp } from "nuxt/app";

const { $cn } = useNuxtApp();

interface Props extends PinInputInputProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<Props>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;
  return delegated;
});
</script>

<template>
  <PinInputInput
    v-bind="delegatedProps"
    united="input"
    :class="
      $cn(
        'transition-all relative text-center flex items-center justify-center text-sm w-[56px] h-[56px] cursor-pointer focus:cursor-text resize-none outline-none px-3',
        props.class,
      )
    "
  />
</template>
