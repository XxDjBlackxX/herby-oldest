<script setup>
import { DrawerTitle, DrawerDescription } from ".";
</script>

<template>
  <div class="flex flex-col items-start justify-between w-full mb-2">
    <DrawerTitle v-if="$slots.title">
      <slot name="title" />
    </DrawerTitle>
    <DrawerDescription v-if="$slots.description">
      <slot name="description" />
    </DrawerDescription>
  </div>
</template>
