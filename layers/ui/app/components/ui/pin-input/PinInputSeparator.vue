<script lang="ts" setup>
import { Primitive, type PrimitiveProps } from "reka-ui";
import { computed } from "vue";

const props = defineProps<PrimitiveProps>();

const delegatedProps = computed(() => {
  const { ...delegated } = props;
  return delegated;
});
</script>

<template>
  <Primitive v-bind="delegatedProps">
    <slot>
      <IconDot />
    </slot>
  </Primitive>
</template>
