<script setup lang="ts">
const props = defineProps<{ modelValue?: string }>();
const emits = defineEmits<{ "update:modelValue": string }>();

defineOptions({
  inheritAttrs: false,
});

const modelValue = useVModel(props, "modelValue", emits, {
  passive: true,
  defaultValue: "",
});

function formatExpiry(input: string): string {
  const digits = input.replace(/\D/g, "").slice(0, 4);
  return digits.length >= 2
    ? digits.slice(0, 2) + "/" + digits.slice(2, 4)
    : digits;
}

const expiryFormatted = computed({
  get: () => formatExpiry(modelValue.value || ""),
  set: (newValue: string) => {
    modelValue.value = formatExpiry(newValue);
  },
});

const attrs = useAttrs();
const inputAttrs = computed(() => ({
  id: attrs.id,
  "aria-invalid": attrs["aria-invalid"],
  "aria-describedby": attrs["aria-describedby"],
}));
</script>

<template>
  <UiInput
    v-bind="inputAttrs"
    v-model="expiryFormatted"
    :value="expiryFormatted"
    placeholder="MM/YY"
  />
</template>
