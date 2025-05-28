<script setup lang="ts">
import Skeleton from "./Skeleton.vue";

defineProps<{ height: number | string }>();
</script>

<template>
  <Skeleton :style="{ height: $formatSize(height) }" class="w-full" />
</template>
