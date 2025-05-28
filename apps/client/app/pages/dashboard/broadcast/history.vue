<script setup lang="ts">
import { PERMISSIONS } from "@repo/permission-utils";

const { t } = useImports();

const analytics = ref([]);

onMounted(async () => {
  try {
    const response = await putReq("/users/me/analytics/soundbites/broadcast");

    analytics.value = response.data.data;
  } catch (err) {
    console.error(err);
  }
});

definePageMeta({
  middleware: "authentication",
});
</script>

<template>
  <NuxtLayout name="dashboard" :perms="PERMISSIONS.broadcaster">
    <UiAreaChart
      :data="analytics"
      index="name"
      :categories="['testCount', 'saleCount']"
    />
    <UiSeparator
      :label="t('app.pages.dashboard.broadcast.history.separator.soundbites')"
    />
    <UiAdvancedPaginatedTable
      :request="{ url: '/users/me/history/soundbites/broadcast' }"
      item-key="soundbites"
      :items-per-page="30"
      :heads="[
        {
          name: $t(
            'app.pages.dashboard.broadcast.history.table.head.soundbite',
          ),
          value: 'soundbite',
        },
        {
          name: $t('app.pages.dashboard.broadcast.history.table.head.orbit'),
          value: 'orbit',
        },
        {
          name: $t('app.pages.dashboard.broadcast.history.table.head.sender'),
          value: 'sender',
        },
        {
          name: $t('app.pages.dashboard.broadcast.history.table.head.env'),
          value: 'env',
        },
        {
          name: $t('app.pages.dashboard.broadcast.history.table.head.context'),
          value: 'context',
        },
      ]"
    >
      <template #soundbite="{ item }">
        <span class="flex items-center gap-x-3">
          <SoundbiteMiniPlayer :item="item" />
          <span class="flex flex-col items-start gap-y-1">
            <h4 class="whitespace-nowrap">
              {{ item.title }}
            </h4>
            <p class="text-typography-500">
              {{ new Date(item.createdAt).toLocaleDateString() }}
            </p>
          </span>
        </span>
      </template>
      <template #orbit="{ value }">
        {{
          value == null
            ? $t("app.pages.dashboard.broadcast.history.table.cell.noOrbit")
            : value
        }}
      </template>
      <template #sender="{ value }">
        {{ value }}
      </template>
      <template #env="{ value }">
        {{
          $t(`app.pages.dashboard.broadcast.history.table.cell.env.${value}`)
        }}
      </template>
      <template #context="{ item }">
        <SoundbiteRippleMenu :item="item" />
      </template>
    </UiAdvancedPaginatedTable>
  </NuxtLayout>
</template>
