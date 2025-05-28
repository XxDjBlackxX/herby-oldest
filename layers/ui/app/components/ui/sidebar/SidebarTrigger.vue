<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Button } from "../button";
import { useSidebar } from "./utils";
import { useNuxtApp } from "nuxt/app";

const { $cn } = useNuxtApp();
const props = defineProps<{
  class?: HTMLAttributes["class"];
}>();

const { toggleSidebar } = useSidebar();
</script>

<template>
  <Button
    data-sidebar="trigger"
    variant="ghost"
    size="icon"
    :class="$cn('p-2', props.class)"
    @click="toggleSidebar"
  >
    <IconPanelLeft :size="20" />
  </Button>
</template>
