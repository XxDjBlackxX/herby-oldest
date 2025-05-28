<script setup lang="ts">
import { AlertDialogRoot } from "reka-ui";
import AlertDialogTrigger from "./AlertDialogTrigger.vue";
import AlertDialogTitle from "./AlertDialogTitle.vue";
import AlertDialogContent from "./AlertDialogContent.vue";
import AlertDialogCancel from "./AlertDialogCancel.vue";
import AlertDialogAction from "./AlertDialogAction.vue";
import AlertDialogDescription from "./AlertDialogDescription.vue";

interface Props {
  waiting?: boolean;
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  class: "w-full",
});
</script>

<template>
  <AlertDialogRoot>
    <AlertDialogTrigger :class="props.class">
      <slot name="trigger" />
    </AlertDialogTrigger>
    <AlertDialogContent class="flex flex-col items-start gap-5">
      <div
        class="absolute flex items-center justify-center -top-[75px] left-0 w-full"
      >
        <IconAlienReadingNewspaper :size="100" />
      </div>
      <div class="flex flex-col items-start gap-2">
        <span class="flex items-start justify-between w-full mt-5">
          <AlertDialogTitle class="pr-5"
            ><slot name="title"
          /></AlertDialogTitle>
          <AlertDialogCancel />
        </span>
        <AlertDialogDescription class="pr-5"
          ><slot name="description"
        /></AlertDialogDescription>
      </div>
      <UiSeparator />
      <div class="flex items-center justify-end w-full h-full">
        <AlertDialogAction @action="$emit('action')" :waiting="waiting" />
      </div>
    </AlertDialogContent>
  </AlertDialogRoot>
</template>
