<script setup lang="ts">
import { DialogTitle, DialogDescription } from ".";
import { useNuxtApp } from "nuxt/app";

const { $cn } = useNuxtApp();
</script>

<template>
  <div
    :class="
      $cn(
        'flex justify-between w-full mb-2',
        $slots.description ? 'flex-col items-start' : 'items-center',
      )
    "
  >
    <DialogTitle v-if="$slots.title">
      <slot name="title" />
    </DialogTitle>
    <DialogDescription v-if="$slots.description">
      <slot name="description" />
    </DialogDescription>
  </div>
</template>
