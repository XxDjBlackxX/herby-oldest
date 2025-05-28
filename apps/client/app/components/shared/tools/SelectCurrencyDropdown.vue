<script setup lang="ts">
import type { Currency } from "@repo/client-types";

const { sessionStore, pageStore } = useImports();

const currentUser = computed(() => {
  return sessionStore._getUser;
});
const currencies = computed(() => {
  return pageStore._getConfig.currencies;
});

const isWaiting = ref(false);
const currency = ref(currentUser.value?.payment?.currency);

function changeCurrency(newCurrency: Currency) {
  isWaiting.value = true;
  postReq(`/users/me/change-currency/${newCurrency.id}`)
    .then(() => (currency.value = newCurrency))
    .catch(() => (currency.value = currentUser.value?.payment?.currency))
    .finally(() => (isWaiting.value = false));
}
</script>

<template>
  <UiSelect
    v-if="currency"
    :model-value="currency"
    @update:model-value="changeCurrency"
  >
    <UiSelectTrigger size="sm" :waiting="isWaiting">
      {{
        $t("app.components.shared.tools.selectCurrencyDropdown.value", {
          name: currency.name,
        })
      }}
    </UiSelectTrigger>
    <UiSelectContent>
      <UiSelectGroup>
        <UiSelectItem
          v-for="currency in currencies"
          :key="currency.id"
          :value="currency"
        >
          {{ currency.name }} ({{ currency.symbol }})
        </UiSelectItem>
      </UiSelectGroup>
    </UiSelectContent>
  </UiSelect>
</template>
