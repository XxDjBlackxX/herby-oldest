<script setup lang="ts">
import { Button } from ".";

const goBack = () => {
  window.history.back();
};

const goForward = () => {
  window.history.forward();
};
</script>

<template>
  <div class="flex items-center gap-2">
    <Button variant="ghost" class="p-1.5" @click="goBack">
      <IconChevronLeft :size="20" />
    </Button>
    <Button variant="ghost" class="p-1.5" @click="goForward">
      <IconChevronRight :size="20" />
    </Button>
  </div>
</template>
