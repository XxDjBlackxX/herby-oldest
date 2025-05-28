<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { textareaVariants, TextAreaVariants } from ".";
import { useVModel } from "@vueuse/core";

const props = withDefaults(
  defineProps<{
    class?: HTMLAttributes["class"];
    defaultValue?: string;
    modelValue?: string;
    size?: TextAreaVariants["size"];
    disabled?: boolean;
    placeholder?: string;
  }>(),
  { defaultValue: "" },
);
const emits = defineEmits<{
  (e: "update:modelValue", payload: string): void;
}>();

const modelValue = useVModel(props, "modelValue", emits, {
  passive: true,
  defaultValue: props.defaultValue,
});
</script>

<template>
  <div class="relative flex items-end justify-end w-full">
    <textarea
      v-model="modelValue"
      united="input"
      :placeholder="placeholder"
      :disabled="disabled"
      :class="$cn(textareaVariants({ size }), props.class)"
    />
    <span class="absolute bottom-0 right-0 m-4 pointer-events-none font-light">
      {{ modelValue?.length }}
    </span>
  </div>
</template>
