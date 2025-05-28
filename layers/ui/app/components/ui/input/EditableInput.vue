<script lang="ts" setup>
import { EditableInputVariants, editableInputVariants } from "./variants";
import Input from "./Input.vue";
import { useNuxtApp } from "nuxt/app";
import { ref, watch } from "vue";

const { $cn } = useNuxtApp();

defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(
  defineProps<{
    value?: string | number;
    class?: string;
    type?: string;
    waiting?: boolean;
    disabled?: boolean;
    size?: EditableInputVariants["size"];
    min?: number;
    max?: number;
  }>(),
  { size: "sm" },
);

const emits = defineEmits<{
  (e: "submit", payload: string | number): void;
}>();

const isEditable = ref(false);
const current = ref(props.value);

function onReset() {
  current.value = props.value;
  isEditable.value = false;
}

function onSubmit() {
  if (props.type == "number" && typeof current.value == "string") {
    emits("submit", parseInt(current.value));
  } else {
    emits("submit", current.value);
  }
}

watch(
  () => props.waiting,
  () => {
    if (!props.waiting) {
      isEditable.value = false;
    }
  },
);

watch(
  () => current.value,
  (value) => {
    if (
      props.type == "number" &&
      typeof value == "number" &&
      (value < props.min || value > props.max)
    ) {
      isEditable.value = false;
      return;
    }
    if (value.toString().length <= 0) return (isEditable.value = false);
    isEditable.value = props.value.toString() !== value.toString();
    if (props.value.toString() == value.toString()) {
      isEditable.value = false;
      return;
    }
  },
);
</script>

<template>
  <div
    v-bind="$attrs"
    :class="$cn(editableInputVariants({ size }), props.class)"
    :data-editable="isEditable"
    :data-size="size"
    :data-waiting="waiting"
  >
    <div class="flex items-center w-full h-full gap-2">
      <span
        v-if="$slots.prefix"
        class="flex items-center justify-center rounded-primary bg-surface-200 border border-surface-400 group-data-[size=sm]:h-[46px] group-data-[size=sm]:w-[46px] group-data-[size=base]:h-[56px] group-data-[size=base]:w-[56px] group-aria-disabled:cursor-not-allowed group-aria-disabled:opacity-50"
      >
        <slot name="prefix" />
      </span>
      <Input
        class="h-full cursor-pointer focus:cursor-text"
        :type="type"
        :min="min"
        :max="max"
        v-model="current"
      />
    </div>
    <div
      class="transition-all absolute right-0 flex items-center group-data-[editable=false]:translate-x-2 group-data-[editable=false]:opacity-0 group-data-[editable=false]:pointer-events-none group-data-[editable=true]:-translate-x-2 group-data-[editable=true]:opacity-100 group-data-[editable=true]:pointer-events-auto"
    >
      <span v-if="waiting" class="p-2">
        <IconLoader :size="20" />
      </span>
      <span v-else>
        <button type="button" :class="$style.controlButton" @click="onSubmit">
          <IconCheck :size="20" />
        </button>
        <button type="button" :class="$style.controlButton" @click="onReset">
          <IconHistory :size="20" />
        </button>
      </span>
    </div>
  </div>
</template>

<style module scoped>
.controlButton {
  @apply transition-all p-1 rounded-full hover:scale-[1.1];
}
</style>
