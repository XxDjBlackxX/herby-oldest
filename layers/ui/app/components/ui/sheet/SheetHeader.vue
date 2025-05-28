<script setup lang="ts">
import SheetClose from "./SheetClose.vue";
import SheetTitle from "./SheetTitle.vue";
</script>

<template>
  <div class="flex items-center justify-between w-full pb-2 mb-5 gap-2">
    <h6 v-if="$slots.title" class="flex items-center gap-2 text-start">
      <slot name="icon" />
      <SheetTitle>
        <slot name="title" />
      </SheetTitle>
    </h6>
    <SheetClose />
  </div>
</template>
