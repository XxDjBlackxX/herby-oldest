<template>
  <UiIntroductionCard>
    <template #icon>
      <IconWallet :size="60" />
    </template>
    <template #title>
      {{ $t("app.components.common.card.balanceHistory.title") }}
    </template>
    <template #description>
      {{ $t("app.components.common.card.balanceHistory.description") }}
    </template>
    <template #button>
      <UiButton
        to="/settings/payment/balance-history"
        class="px-5 py-1.5 shadow-xl"
      >
        {{ $t("app.components.common.card.balanceHistory.button") }}
      </UiButton>
    </template>
  </UiIntroductionCard>
</template>
