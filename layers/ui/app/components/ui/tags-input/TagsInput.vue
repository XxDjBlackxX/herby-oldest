<script lang="ts" setup>
import type { HTMLAttributes } from "vue";
import TagsInputInput from "./TagsInputInput.vue";
import TagsInputItem from "./TagsInputItem.vue";
import TagsInputItemDelete from "./TagsInputItemDelete.vue";
import TagsInputItemText from "./TagsInputItemText.vue";
import {
  type TagsInputRootEmits,
  type TagsInputRootProps,
  useForwardPropsEmits,
  TagsInputRoot,
} from "reka-ui";
import { useNuxtApp } from "nuxt/app";

const { $cn } = useNuxtApp();

interface Props extends TagsInputRootProps {
  class?: HTMLAttributes["class"];
  placeholder?: string;
}

const props = withDefaults(defineProps<Props>(), { placeholder: "..." });
const emits = defineEmits<TagsInputRootEmits>();

const forward = useForwardPropsEmits(props, emits);
</script>

<template>
  <TagsInputRoot
    v-bind="forward"
    v-auto-animate
    united="input"
    :class="
      $cn(
        'transition-all flex flex-wrap items-start justify-start w-full p-2 gap-2',
        props.class,
      )
    "
  >
    <TagsInputItem
      v-for="(item, index) in props.modelValue"
      :key="index"
      :value="item"
    >
      <TagsInputItemText />
      <TagsInputItemDelete />
    </TagsInputItem>

    <TagsInputInput :placeholder="forward.placeholder" />
  </TagsInputRoot>
</template>
