<script setup lang="ts">
import { DialogClose, type DialogCloseProps } from "reka-ui";
import { defaultButtonVariants } from "../button";
import { useNuxtApp } from "nuxt/app";

const { $cn } = useNuxtApp();
const props = defineProps<DialogCloseProps>();
</script>

<template>
  <DialogClose
    v-bind="props"
    :class="$cn('p-2', defaultButtonVariants({ variant: 'ghost' }))"
  >
    <IconX :size="20" />
  </DialogClose>
</template>
