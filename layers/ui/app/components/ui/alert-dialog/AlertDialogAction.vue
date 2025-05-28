<script lang="ts" setup>
import {
  useForwardPropsEmits,
  AlertDialogAction,
  type AlertDialogActionProps,
} from "reka-ui";
import type { HTMLAttributes } from "vue";
import { defaultButtonVariants } from "../button";
import { useNuxtApp } from "nuxt/app";

const { $cn, $onClick } = useNuxtApp();

interface Props extends AlertDialogActionProps {
  class?: HTMLAttributes["class"];
  waiting?: boolean;
}

const props = defineProps<Props>();
const emits = defineEmits(["action"]);

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <AlertDialogAction
    :class="
      $cn(
        'px-3 py-2',
        defaultButtonVariants({ variant: 'primary' }),
        props.class,
      )
    "
    v-bind="forwarded"
    @click="$onClick({ callback: () => emits('action') })"
  >
    <IconLoader v-if="props.waiting" :size="20" />
    <span v-else>{{ $t("layers.ui.index.alertDialog.button.action") }}</span>
  </AlertDialogAction>
</template>
