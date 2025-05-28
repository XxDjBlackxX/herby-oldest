<script lang="ts" setup>
import { Toaster as Sonner, type ToasterProps } from "vue-sonner";

const props = defineProps<ToasterProps>();
</script>

<template>
  <Sonner
    class="toaster group"
    v-bind="props"
    :toast-options="{
      classes: {
        toast:
          'group toast group-[.toaster]:bg-surface-100 group-[.toaster]:text-typography-50 group-[.toaster]:border-surface-300 font-medium font-kanit text-base group-[.toaster]:shadow-lg',
        description: 'group-[.toast]:text-typography-500',
      },
    }"
  />
</template>
