<template>
  <UiIntroductionCard>
    <template #icon>
      <IconLayoutDashboard :size="60" />
    </template>
    <template #title>
      {{ $t("app.components.common.card.dashboard.title") }}
    </template>
    <template #description>
      {{ $t("app.components.common.card.dashboard.description") }}
    </template>
    <template #button>
      <UiButton to="/dashboard" class="px-5 py-1.5 shadow-xl">
        {{ $t("app.components.common.card.dashboard.button") }}
      </UiButton>
    </template>
  </UiIntroductionCard>
</template>
