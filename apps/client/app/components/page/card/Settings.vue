<template>
  <UiIntroductionCard>
    <template #icon>
      <IconSettings2 :size="60" />
    </template>
    <template #title>
      {{ $t("app.components.common.card.settings.title") }}
    </template>
    <template #description>
      {{ $t("app.components.common.card.settings.description") }}
    </template>
    <template #button>
      <UiButton to="/settings/profile/edit" class="px-5 py-1.5 shadow-xl">
        {{ $t("app.components.common.card.settings.button") }}
      </UiButton>
    </template>
  </UiIntroductionCard>
</template>
