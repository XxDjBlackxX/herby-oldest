<script setup lang="ts">
import { PERMISSIONS } from "@repo/permission-utils";
import {
  TRANSACTION_STATUS,
  TRANSACTION_PRIORITIES,
} from "../../../../constants/data";
import type { Transaction } from "@repo/client-types";

const status = ref("pending");
const priority = ref("high");

interface SuperTransaction extends Transaction {
  waiting: boolean;
}

async function onUpdateStatus(item: SuperTransaction, value: any) {
  item.waiting = true;
  postReq(`/admin/manage/transactions/${item.id}/status/${value}`)
    .then(() => {
      item.status = value as "pending";
      item.waiting = false;
    })
    .catch(() => {});
}

definePageMeta({
  middleware: "authentication",
});
</script>

<template>
  <NuxtLayout name="admin" :perms="PERMISSIONS.financier">
    <div class="flex sm:flex-col lg:flex-row items-center w-full gap-10">
      <UiItemField>
        <template #label>
          {{ $t("app.pages.admin.finance.transactions.options.status.label") }}
        </template>
        <template #item>
          <UiSelect v-model="status">
            <UiSelectTrigger size="sm">
              <UiSelectValue />
            </UiSelectTrigger>
            <UiSelectContent>
              <UiSelectGroup>
                <UiSelectItem
                  v-for="item in TRANSACTION_STATUS"
                  :key="item"
                  :value="item"
                >
                  {{
                    $t(
                      `app.pages.admin.finance.transactions.options.status.items.${item}`,
                    )
                  }}
                </UiSelectItem>
              </UiSelectGroup>
            </UiSelectContent>
          </UiSelect>
        </template>
      </UiItemField>
      <UiItemField>
        <template #label>
          {{
            $t("app.pages.admin.finance.transactions.options.priority.label")
          }}
        </template>
        <template #item>
          <UiSelect v-model="priority">
            <UiSelectTrigger size="sm">
              <UiSelectValue />
            </UiSelectTrigger>
            <UiSelectContent>
              <UiSelectGroup>
                <UiSelectItem
                  v-for="item in TRANSACTION_PRIORITIES"
                  :key="item"
                  :value="item"
                >
                  {{
                    $t(
                      `app.pages.admin.finance.transactions.options.priority.items.${item}`,
                    )
                  }}
                </UiSelectItem>
              </UiSelectGroup>
            </UiSelectContent>
          </UiSelect>
        </template>
      </UiItemField>
    </div>
    <UiSuperPaginatedTable
      :items-per-page="60"
      item-key="transactions"
      :request="{ url: `/admin/data/transactions/${status}/${priority}` }"
      :heads="[
        {
          name: $t('app.pages.admin.finance.transactions.table.head.manage'),
          value: 'manage',
        },
        {
          name: $t('app.pages.admin.finance.transactions.table.head.author'),
          value: 'author',
        },
        {
          name: $t('app.pages.admin.finance.transactions.table.head.type'),
          value: 'type',
        },
        {
          name: $t('app.pages.admin.finance.transactions.table.head.amount'),
          value: 'amount',
        },
        {
          name: $t('app.pages.admin.finance.transactions.table.head.currency'),
          value: 'currency',
        },
        {
          name: $t('app.pages.admin.finance.transactions.table.head.payee'),
          value: 'payee',
        },
        {
          name: $t('app.pages.admin.finance.transactions.table.head.id'),
          value: 'id',
        },
      ]"
    >
      <template #manage="{ item }">
        <div v-if="item.status == 'pending'" class="flex items-center gap-2">
          <UiButton
            :waiting="item.waiting"
            variant="greenish"
            class="p-2"
            align="center"
            @click="onUpdateStatus(item, 'success')"
          >
            <IconCheck :size="20" />
          </UiButton>
          <UiButton
            :waiting="item.waiting"
            variant="reddish"
            class="p-2"
            align="center"
            @click="onUpdateStatus(item, 'canceled')"
          >
            <IconX :size="20" />
          </UiButton>
        </div>
        <template v-else>
          {{ $t("app.pages.admin.finance.transactions.table.cell.manage") }}
        </template>
      </template>
      <template #author="{ value }">
        <UiHrefButton :href="`/admin/users/${value.id}`">
          {{ value.username }}
        </UiHrefButton>
      </template>
      <template #type="{ value }">
        {{
          $t(`app.pages.admin.finance.transactions.table.cell.type.${value}`)
        }}
      </template>
      <template #amount="{ value, item }">
        {{ item.currency.symbol }} {{ value }}
      </template>
      <template #currency="{ value }">
        {{ value.name }}
      </template>
      <template #payee="{ value }">
        <template v-if="value">
          {{ value.fullName }}, {{ value.iban }}
        </template>
        <template v-else>
          {{ $t("app.pages.admin.finance.transactions.table.cell.payee") }}
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
