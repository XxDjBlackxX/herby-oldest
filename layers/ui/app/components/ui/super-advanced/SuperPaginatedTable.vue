<script setup lang="ts">
import { ref, reactive, computed, watch, getCurrentInstance } from "vue";
import { Button } from "../button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "../table";
import {
  SuperPaginatedTableProps,
  SuperPaginatedTableEmits,
} from "./interface";

const props = withDefaults(defineProps<SuperPaginatedTableProps>(), {
  itemsPerPage: 10,
});
defineEmits<SuperPaginatedTableEmits>();

const instance = getCurrentInstance();

const items = ref<any[]>([]);
const waiting = reactive({
  table: false,
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
  waiting.table = true;
  waiting.button = true;
  try {
    const response = await putReq(props.request.url, {
      ...props.request.body,
      limit: limit.value,
    });
    const data = response.data.data;
    pagination.totalItems = data.total;
    items.value = [...items.value, ...data[props.itemKey]];
  } catch (error) {
    console.error(error);
  } finally {
    waiting.table = false;
    waiting.button = false;
  }
}

watch(() => pagination.currentPage, fetchItems, { immediate: true });

const isClickable = ref(instance?.vnode.props?.onClick !== undefined);

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
  <article class="flex flex-col items-center w-full gap-y-5">
    <div :class="$cn('flex flex-col gap-y-2 w-full', props.class)">
      <Table v-if="items.length">
        <TableHeader>
          <TableRow>
            <TableHead
              v-for="head in props.heads"
              :key="head.value"
              :class="head.class"
            >
              {{ head.name }}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow
            v-for="(item, index) in items"
            :key="index"
            :class="isClickable ? 'cursor-pointer' : ''"
            @click="
              $onClick({
                disabled: !isClickable,
                callback: () => $emit('click', item),
              })
            "
          >
            <TableCell v-for="head in props.heads" :key="head.value">
              <slot :name="head.value" :value="item[head.value]" :item="item" />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <template v-if="waiting.table">
        <UiSkeletonTable />
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
