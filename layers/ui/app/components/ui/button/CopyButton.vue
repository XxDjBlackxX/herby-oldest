<script setup lang="ts">
import { useClipboard } from "@vueuse/core";

const props = defineProps({ source: { type: String, default: "Hello" } });
const { copy, copied, isSupported } = useClipboard({ source: props.source });

function onCopy() {
  copy(props.source);
}
</script>

<template>
  <div v-if="isSupported">
    <UiButton
      :variant="copied ? 'primary' : 'ghost'"
      class="p-2"
      :disabled="copied"
      @click="onCopy"
    >
      <span v-if="!copied"><IconCopy :size="16" /></span>
      <span v-else><IconCopyCheck :size="16" /></span>
    </UiButton>
  </div>
  <p v-else>Your browser does not support Clipboard API</p>
</template>
