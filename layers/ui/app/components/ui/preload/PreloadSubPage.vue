<script setup lang="ts">
import { useNuxtApp } from "nuxt/app";

const { $cn } = useNuxtApp();
const props = defineProps({
  class: { type: String, default: "" },
});
</script>

<template>
  <div
    :class="
      $cn(
        'flex items-center justify-center container rounded-primary w-full h-[500px] bg-surface-100 border border-surface-300',
        props.class,
      )
    "
  >
    <div class="loading-bar"></div>
    <div class="loading-bar"></div>
    <div class="loading-bar"></div>
    <div class="loading-bar"></div>
  </div>
</template>

<style scoped>
.loading-bar {
  width: 20px;
  height: 10px;
  margin: 0 5px;
  background-color: hsl(var(--primary-500));
  border-radius: 5px;
  animation: loading-wave-animation 1s ease-in-out infinite;
}

.loading-bar:nth-child(2) {
  animation-delay: 0.1s;
}

.loading-bar:nth-child(3) {
  animation-delay: 0.2s;
}

.loading-bar:nth-child(4) {
  animation-delay: 0.3s;
}

@keyframes loading-wave-animation {
  0% {
    height: 10px;
  }

  50% {
    height: 50px;
  }

  100% {
    height: 10px;
  }
}
</style>
