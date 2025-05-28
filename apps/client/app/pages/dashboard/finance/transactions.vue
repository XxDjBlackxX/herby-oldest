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
      item-key="transactions"
      :request="{ url: '/users/me/financial/transactions' }"
      :heads="[
        {
          name: $t(
            'app.pages.dashboard.finance.transactions.table.head.status',
          ),
          value: 'status',
        },
        {
          name: $t('app.pages.dashboard.finance.transactions.table.head.type'),
          value: 'type',
        },
        {
          name: $t(
            'app.pages.dashboard.finance.transactions.table.head.amount',
          ),
          value: 'amount',
        },
        {
          name: $t(
            'app.pages.dashboard.finance.transactions.table.head.currency',
          ),
          value: 'currency',
        },
        {
          name: $t(
            'app.pages.dashboard.finance.transactions.table.head.priority',
          ),
          value: 'priority',
        },
        {
          name: $t('app.pages.dashboard.finance.transactions.table.head.payee'),
          value: 'payee',
        },
        {
          name: $t('app.pages.dashboard.finance.transactions.table.head.id'),
          value: 'id',
        },
      ]"
    >
      <template #status="{ value }">
        <UiBadge :variant="value">
          {{
            $t(
              `app.pages.dashboard.finance.transactions.table.cell.status.${value}`,
            )
          }}
        </UiBadge>
      </template>
      <template #type="{ value }">
        {{
          $t(
            `app.pages.dashboard.finance.transactions.table.cell.type.${value}`,
          )
        }}
      </template>
      <template #amount="{ value, item }">
        {{ item.currency.symbol }} {{ value }}
      </template>
      <template #currency="{ value }">
        {{ value.name }}
      </template>
      <template #priority="{ value }">
        {{
          $t(
            `app.pages.dashboard.finance.transactions.table.cell.priority.${value}`,
          )
        }}
      </template>
      <template #payee="{ value }">
        <template v-if="value">
          {{ value.fullName }}, {{ value.iban }}
        </template>
        <template v-else>
          {{ $t("app.pages.dashboard.finance.transactions.table.cell.payee") }}
        </template>
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
