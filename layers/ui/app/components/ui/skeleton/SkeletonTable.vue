<script setup>
import { Skeleton } from ".";
</script>

<template>
  <div class="flex flex-col w-full gap-y-2">
    <Skeleton v-for="n in 12" :key="n" class="w-full h-[60px]" />
  </div>
</template>
