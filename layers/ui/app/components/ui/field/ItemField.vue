<script lang="ts" setup>
import { Separator } from "../separator";
import { Label } from "../label";
import TypographyDesc from "../typography/TypographyDesc.vue";

defineOptions({
  inheritAttrs: false,
});

defineProps({
  variant: { type: String, default: "input" },
  waiting: Boolean,
  disabled: Boolean,
});
</script>

<template>
  <fieldset
    v-bind="$attrs"
    class="transition-all relative flex items-start flex-col gap-2 w-full group data-[waiting=true]:blur-sm"
  >
    <span
      :data-waiting="waiting"
      class="transition-all absolute top-0 left-0 flex items-center justify-center min-w-[110%] min-h-[110%] backdrop-blur-sm data-[waiting=false]:pointer-events-none data-[waiting=true]:pointer-events-auto data-[waiting=true]:cursor-wait data-[waiting=true]:opacity-100 data-[waiting=false]:opacity-0"
    >
      <IconLoader :size="30" />
    </span>
    <Label v-if="variant == 'input'" class="text-sm">
      <slot name="label" />
    </Label>
    <div
      v-else-if="variant == 'switch'"
      class="flex flex-col items-start gap-2 pr-14"
    >
      <Label class="text-base">
        <slot name="label" />
      </Label>
      <TypographyDesc>
        <slot name="description" />
      </TypographyDesc>
    </div>
    <span
      :data-variant="variant"
      class="data-[variant=input]:w-full data-[variant=switch]:absolute data-[variant=switch]:top-0 data-[variant=switch]:right-0"
    >
      <slot name="item" />
    </span>
    <Separator v-if="variant == 'switch'" class="mt-2" />
  </fieldset>
</template>
