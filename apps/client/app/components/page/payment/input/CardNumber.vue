<script setup lang="ts">
const props = defineProps<{ modelValue?: string }>();
const emits = defineEmits<{ "update:modelValue": string[] }>();

defineOptions({
  inheritAttrs: false,
});

const modelValue = useVModel(props, "modelValue", emits, {
  passive: true,
  defaultValue: "",
});

const numberFormatted = computed({
  get() {
    const value = `${modelValue.value}`;
    const digits = value.replace(/\D/g, "");
    return digits.match(/.{1,4}/g)?.join("-") || "";
  },
  set(newValue: string) {
    let digits = newValue.replace(/\D/g, "");
    if (digits.length > 16) {
      digits = digits.slice(0, 16);
    }
    modelValue.value = digits;
  },
});

const attrs = useAttrs();

const inputAttrs = computed(() => {
  return {
    id: attrs.id,
    "aria-invalid": attrs["aria-invalid"],
    "aria-describedby": attrs["aria-describedby"],
  };
});
</script>

<template>
  <UiInput
    v-bind="inputAttrs"
    v-model="numberFormatted"
    :value="numberFormatted"
    placeholder="xxxxx-xxxxx-xxxxx-xxxxx"
  />
</template>
