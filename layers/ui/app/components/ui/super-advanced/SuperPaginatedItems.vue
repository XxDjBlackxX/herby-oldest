<script setup lang="ts">
import { ref, reactive, computed, watch } from "vue";
import type {
  SuperPaginatedItemsEmits,
  SuperPaginatedItemsProps,
} from "./interface";
import { Button } from "../button";

const props = withDefaults(defineProps<SuperPaginatedItemsProps>(), {
  itemsPerPage: 10,
});
defineEmits<SuperPaginatedItemsEmits>();

const items = ref<any[]>([]);

const waiting = reactive({
  items: true,
  button: false,
});

const pagination = reactive({
  currentPage: 1,
  totalItems: 0,
});

const limit = computed(() => ({
  after: (pagination.currentPage - 1) * props.itemsPerPage,
  before: pagination.currentPage * props.itemsPerPage,
}));

async function fetchItems() {
  waiting.items = true;
  waiting.button = true;
  try {
    const response = await putReq(props.request.url, {
      ...props.request.body,
      limit: limit.value,
    });
    const data = response.data.data;
    pagination.totalItems = data.total;
    items.value.push(...data[props.itemKey]);
  } catch (error) {
    console.error(error);
  } finally {
    waiting.items = false;
    waiting.button = false;
  }
}

watch(() => pagination.currentPage, fetchItems, { immediate: true });

watch(
  () => props.request.url,
  () => {
    pagination.currentPage = 1;
    items.value = [];
    fetchItems();
  },
);

const canLoadMore = computed(() => pagination.totalItems > items.value.length);
</script>

<template>
  <article class="flex flex-col items-center w-full gap-y-10">
    <div :class="props.class">
      <template v-if="items.length">
        <slot
          v-for="(item, index) in items"
          :key="index"
          v-bind="item"
          name="item"
        />
      </template>
      <template v-if="waiting.items">
        <slot v-for="i in props.itemsPerPage" :key="i" name="skeleton"></slot>
      </template>
    </div>
    <Button
      v-if="canLoadMore"
      variant="ghost"
      class="gap-2 px-4 py-2 text-sm"
      :waiting="waiting.button"
      @click="pagination.currentPage++"
    >
      {{ $t("layers.ui.index.field.itemFields") }}
      <IconChevronDown :size="16" />
    </Button>
  </article>
</template>
