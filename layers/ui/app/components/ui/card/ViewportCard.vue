<script lang="ts" setup>
import type { ViewportCardProps } from ".";
import { TypographyDesc } from "../typography";
import { Label } from "../label";
import { useNuxtApp } from "nuxt/app";

const { $cn } = useNuxtApp();

const props = withDefaults(defineProps<ViewportCardProps>(), {
  label: null,
  sublabel: null,
  class: "min-h-[50px]",
});
</script>

<template>
  <div
    :class="
      $cn(
        'transition-all flex flex-col items-start w-full',
        label && !sublabel ? 'gap-2' : 'gap-7',
        {
          'pb-10 border-b border-surface-500': border,
        },
      )
    "
  >
    <header v-if="hypertext" class="flex flex-col items-start gap-2">
      <Label class="text-base font-medium">
        {{ label }}
      </Label>
      <TypographyDesc v-if="sublabel" class="text-start text-sm">
        {{ sublabel }}
      </TypographyDesc>
    </header>
    <div
      :class="
        $cn(
          'transition-all relative flex items-center justify-between w-full px-3 rounded-primary bg-surface-100 border border-surface-300',
          props.class,
        )
      "
    >
      <nav class="flex items-center gap-4">
        <slot name="start" />
      </nav>
      <section
        class="absolute right-0 flex items-center justify-end gap-2 mr-3"
      >
        <slot name="end" />
      </section>
    </div>
  </div>
</template>
