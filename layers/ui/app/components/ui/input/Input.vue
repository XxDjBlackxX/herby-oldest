<script lang="ts" setup>
import { computed, useAttrs } from "vue";
import type { HTMLAttributes } from "vue";
import { InputVariants, inputVariants } from "./variants";
import { useVModel } from "@vueuse/core";

defineOptions({
  inheritAttrs: false,
});

const props = defineProps<{
  defaultValue?: string | number;
  modelValue?: string | number;
  class?: HTMLAttributes["class"];
  type?: string;
  placeholder?: string;
  size?: InputVariants["size"];
  min?: number;
  max?: number;
  disabled?: boolean;
}>();

const emits = defineEmits<{
  (e: "update:modelValue", payload: string | number): void;
}>();

const attrs = useAttrs();

const modelValue = useVModel(props, "modelValue", emits, {
  passive: true,
  defaultValue: props.defaultValue,
});

const hasValue = computed(() => {
  return modelValue.value != null && modelValue.value.toString().length > 0;
});

const showValidationWrapper = computed(() => {
  return attrs["aria-invalid"] !== undefined && !props.disabled;
});

const inputAttrs = computed(() => {
  const {
    "aria-invalid": _invalid,
    "aria-disabled": _disabled,
    ...restAttrs
  } = attrs;
  return {
    ...restAttrs,
    ...(props.type === "number"
      ? { inputmode: "numeric", pattern: "[1-9][0-9]*" }
      : {}),
    disabled: props.disabled || !!attrs["aria-disabled"],
    placeholder: (() => {
      if (props.type === "email") return "h*****@**.com";
      if (props.type === "password") return "********";
      return props.placeholder || "N/A";
    })(),
    type: props.type,
    min: props.min,
    max: props.max,
    step: props.type === "number" ? "1" : undefined,
    pattern: props.type === "number" ? "[0-9]+" : undefined,
    united: "input",
    class: [inputVariants({ size: props.size }), props.class].join(" "),
  };
});

const wrapperAttrs = computed(() => ({
  "aria-invalid": attrs["aria-invalid"],
  "aria-length": hasValue.value,
}));

const handleInput = (event: Event) => {
  const input = event.target as HTMLInputElement;
  let value = input.value;

  if (props.type === "number") {
    let numericValue = Math.floor(Number(value));
    if (props.min !== undefined && numericValue < props.min) {
      numericValue = props.min;
    }
    if (props.max !== undefined && numericValue > props.max) {
      numericValue = props.max;
    }
    modelValue.value = numericValue;
  } else {
    modelValue.value = value;
  }
};
</script>

<template>
  <template v-if="showValidationWrapper">
    <div v-bind="wrapperAttrs" class="relative group">
      <input v-model="modelValue" v-bind="inputAttrs" @input="handleInput" />
      <div
        class="transition-all translate-y-3 absolute z-50 right-3.5 top-0 flex items-center justify-center rounded-full border bg-green-500 border-green-700 group-[&:not([aria-invalid])]:hidden group-[&[aria-length=false][aria-invalid=false]]:opacity-0 group-[&[aria-length=false][aria-invalid=false]]:pointer-events-none group-[&[aria-invalid=true]]:bg-red-500 group-aria-[] group-[&[aria-invalid=true]]:border-red-700 text-white p-0.5"
      >
        <IconCheck :size="16" />
      </div>
    </div>
  </template>
  <template v-else>
    <input v-model="modelValue" v-bind="inputAttrs" @input="handleInput" />
  </template>
</template>
