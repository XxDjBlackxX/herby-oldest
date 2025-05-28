<script setup lang="ts">
import {
  PaginationRoot,
  PaginationList,
  PaginationListItem,
  type PaginationRootEmits,
  type PaginationRootProps,
  useForwardPropsEmits,
} from "reka-ui";
import PaginationEllipsis from "./PaginationEllipsis.vue";
/**import PaginationFirst from "./PaginationFirst.vue";
import PaginationLast from "./PaginationLast.vue";*/
import PaginationNext from "./PaginationNext.vue";
import PaginationPrev from "./PaginationPrev.vue";
import { useNuxtApp } from "nuxt/app";

const { $cn } = useNuxtApp();

const props = defineProps<PaginationRootProps>();
const emits = defineEmits<PaginationRootEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <PaginationRoot v-bind="forwarded" v-slot="{ page }" v-if="props.page">
    <PaginationList
      v-slot="{ items }"
      class="flex flex-wrap items-center gap-2"
    >
      <!--<PaginationFirst />-->
      <PaginationPrev />

      <template v-for="(item, index) in items">
        <PaginationListItem
          v-if="item.type === 'page'"
          :key="index"
          :value="item.value"
          as-child
        >
          <button
            type="button"
            :class="
              $cn(
                'transition-all flex items-center justify-center rounded-primary font-bold w-12 h-12',
                item.value === page
                  ? 'bg-primary-500 text-primary-foreground cursor-not-allowed text-2xl'
                  : 'bg-surface-200 hover:bg-surface-300 text-lg',
              )
            "
          >
            {{ item.value }}
          </button>
        </PaginationListItem>
        <PaginationEllipsis v-else :key="item.type" :index="index" />
      </template>

      <PaginationNext />
      <!--<PaginationLast />-->
    </PaginationList>
  </PaginationRoot>
</template>
