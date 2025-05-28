<script lang="ts" setup>
import { ref, type HTMLAttributes } from "vue";
import { searchBarVariants, SearchBarVariants } from ".";
import { useNuxtApp } from "nuxt/app";
import { useVModel } from "@vueuse/core";

const { $cn, $onClick } = useNuxtApp();

const isFocus = ref(false);

const props = withDefaults(
  defineProps<{
    defaultValue?: string;
    modelValue?: string;
    class?: HTMLAttributes["class"];
    size?: SearchBarVariants["size"];
  }>(),
  { defaultValue: "" },
);

const emits = defineEmits<{
  (e: "update:modelValue", payload: string): void;
  (e: "search", payload: string): void;
}>();

const modelValue = useVModel(props, "modelValue", emits, {
  passive: true,
  defaultValue: props.defaultValue,
});

const onSearch = () =>
  $onClick({
    disabled: modelValue.value.length < 1,
    callback: () => emits("search", modelValue.value),
  });
</script>

<template>
  <div
    :class="searchBarVariants({ size })"
    :data-focus="isFocus"
    @focusin="isFocus = true"
    @focusout="isFocus = false"
  >
    <button
      :class="
        $cn(
          'transition-all absolute flex items-center justify-center h-full min-w-10 hover:scale-[1.1] group-data-[focus=false]:opacity-100 group-data-[focus=false]:translate-x-0 group-data-[focus=true]:opacity-0 group-data-[focus=true]:-translate-x-full',
        )
      "
      type="button"
      @click="onSearch"
    >
      <IconSearch :size="16" />
    </button>
    <input
      type="text"
      v-model="modelValue"
      :placeholder="$t('layers.ui.index.searchBar.placeholder')"
      @keydown.enter="onSearch"
      :class="
        $cn(
          'transition-all flex items-center justify-start w-full group-data-[focus=false]:pl-10 group-data-[focus=true]:pl-3 pr-3 py-3 cursor-pointer focus:cursor-text rounded-primary border-none outline-none bg-gray-300 bg-opacity-50 dark:bg-opacity-20',
          props.class,
        )
      "
    />
  </div>
</template>
