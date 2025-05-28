<script setup lang="ts">
import { ref, reactive, computed, watch } from "vue";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "../table";
import {
  AdvancedPaginatedTableProps,
  AdvancedPaginatedTableEmits,
} from "./interface";
import { Pagination } from "../pagination";

const props = withDefaults(defineProps<AdvancedPaginatedTableProps>(), {
  itemsPerPage: 10,
});
defineEmits<AdvancedPaginatedTableEmits>();

const items = ref({} as Record<number, any[]>);
const isWaiting = ref(false);

const pagination = reactive({
  currentPage: 1,
  totalItems: 0,
});

const limit = computed(() => ({
  after: (pagination.currentPage - 1) * props.itemsPerPage,
  before: pagination.currentPage * props.itemsPerPage,
}));

async function fetchItems() {
  isWaiting.value = true;
  try {
    const response = await putReq(props.request.url, {
      ...props.request.body,
      limit: limit.value,
    });
    const data = response.data.data;
    pagination.totalItems = data.total;
    items.value[pagination.currentPage] = data[props.itemKey];
  } catch (error) {
    console.error(error);
  } finally {
    isWaiting.value = false;
  }
}

watch(() => pagination.currentPage, fetchItems, { immediate: true });

watch(
  () => props.request,
  () => {
    pagination.currentPage = 1;
    items.value = [];
    fetchItems();
  },
  { deep: true },
);
</script>

<template>
  <article class="flex flex-col items-center w-full gap-y-5">
    <div :class="$cn('flex flex-col gap-y-2 w-full', props.class)">
      <UiSkeletonTable v-if="isWaiting" />
      <Table v-else>
        <TableHeader>
          <TableRow>
            <TableHead v-for="head in props.heads" :key="head.value">
              {{ head.name }}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody
          v-if="
            items[pagination.currentPage] &&
            items[pagination.currentPage].length
          "
        >
          <TableRow
            v-for="(item, index) in items[pagination.currentPage]"
            :key="index"
          >
            <TableCell v-for="head in props.heads" :key="head.value">
              <slot :name="head.value" :value="item[head.value]" :item="item" />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
    <Pagination
      v-model:page="pagination.currentPage"
      :total="pagination.totalItems"
      :items-per-page="props.itemsPerPage"
      show-edges
    />
  </article>
</template>
