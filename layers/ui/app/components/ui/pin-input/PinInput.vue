<script lang="ts" setup>
import type { PinInputEmits, PinInputProps } from ".";
import PinInputRoot from "./PinInputRoot.vue";
import PinInputInput from "./PinInputInput.vue";
import { ref } from "vue";
import { useNuxtApp } from "nuxt/app";

const { $cn } = useNuxtApp();
withDefaults(defineProps<PinInputProps & { waiting?: boolean }>(), {
  repeat: 5,
});
const emits = defineEmits<PinInputEmits>();

const values = ref([]);

function handleComplate(e: string[]) {
  emits("complate", e.join(""));
}
</script>

<template>
  <PinInputRoot
    v-model="values"
    @complete="handleComplate"
    placeholder="○"
    id="pin-input"
    class="relative"
    v-auto-animate
  >
    <PinInputInput
      v-for="(id, index) in repeat"
      :class="$cn('transition-all', waiting && 'blur-sm pointer-events-none')"
      :key="id"
      :index="index"
    />
    <IconLoader
      v-if="waiting"
      class="absolute flex justify-center w-full"
      :size="30"
    />
  </PinInputRoot>
</template>
