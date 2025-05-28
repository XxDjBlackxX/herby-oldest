<script setup lang="ts">
import { PERMISSIONS } from "@repo/permission-utils";
definePageMeta({
  middleware: "authentication",
});
</script>

<template>
  <NuxtLayout name="dashboard" :perms="PERMISSIONS.user">
    <UiSuperPaginatedTable
      :items-per-page="10"
      item-key="payments"
      :request="{ url: '/users/me/financial/payments' }"
      :heads="[
        {
          name: $t(
            'app.pages.dashboard.finance.paymentHistory.table.head.status',
          ),
          value: 'status',
        },
        {
          name: $t(
            'app.pages.dashboard.finance.paymentHistory.table.head.totalPrice',
          ),
          value: 'totalPrice',
        },
        {
          name: $t(
            'app.pages.dashboard.finance.paymentHistory.table.head.currency',
          ),
          value: 'currency',
        },
        {
          name: $t('app.pages.dashboard.finance.paymentHistory.table.head.id'),
          value: 'id',
        },
      ]"
      @click="(i) => navigateTo(`/payments/${i.id}`)"
    >
      <template #status="{ value }">
        <UiBadge :variant="value">
          {{
            $t(
              `app.pages.dashboard.finance.paymentHistory.table.cell.status.${value}`,
            )
          }}
        </UiBadge>
      </template>
      <template #totalPrice="{ value, item }">
        {{ item.currency.symbol }} {{ value }}
      </template>
      <template #currency="{ value }">
        {{ value.name }}
      </template>
      <template #id="{ value }">
        <span class="flex items-center gap-2 whitespace-nowrap">
          {{ value }}
          <UiCopyButton :source="value" />
        </span>
      </template>
    </UiSuperPaginatedTable>
  </NuxtLayout>
</template>
