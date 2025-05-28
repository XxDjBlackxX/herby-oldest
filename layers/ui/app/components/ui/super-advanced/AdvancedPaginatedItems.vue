<script setup lang="ts">
import { ref, reactive, computed, watch } from "vue";
import { Pagination } from "../pagination";
import type {
  AdvancedPaginatedItemsEmits,
  AdvancedPaginatedItemsProps,
} from "./interface";

const props = withDefaults(defineProps<AdvancedPaginatedItemsProps>(), {
  itemsPerPage: 10,
});
defineEmits<AdvancedPaginatedItemsEmits>();

const items = ref({} as Record<number, any[]>);
const isWaiting = ref(false);

const pagination = reactive({
  currentPage: 1,
  totalItems: 0,
});

const limit = computed(() => ({
  after: (pagination.currentPage - 1) * props.itemsPerPage,
  before:
    (pagination.currentPage - 1) * props.itemsPerPage + props.itemsPerPage,
}));

async function fetchItems() {
  isWaiting.value = true;
  try {
    const response = await putReq(props.request.url, {
      ...props.request.body,
      limit: limit.value,
    });
    const data = response.data.data;
    pagination.totalItems = data.totalItems;
    items.value[pagination.currentPage] = data[props.itemKey];
  } catch (error) {
    console.error(error);
  } finally {
    isWaiting.value = false;
  }
}

watch(() => pagination.currentPage, fetchItems, { immediate: true });
</script>

<template>
  <article class="flex flex-col items-center w-full gap-y-10">
    <div :class="props.class">
      <template v-if="isWaiting">
        <slot v-for="i in props.itemsPerPage" :key="i" name="skeleton" />
      </template>
      <template v-else>
        <template
          v-if="
            items[pagination.currentPage] &&
            items[pagination.currentPage].length
          "
        >
          <slot
            v-for="(item, index) in items[pagination.currentPage]"
            :key="index"
            v-bind="item"
            name="item"
          />
        </template>
      </template>
    </div>
    <Pagination
      v-model:page="pagination.currentPage"
      :total="pagination.totalItems"
      :items-per-page="props.itemsPerPage"
      show-edges
    />
  </article>
</template>
