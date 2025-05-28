<template>
  <UiIntroductionCard>
    <template #icon>
      <IconSignpost :size="60" />
    </template>
    <template #title>
      {{ $t("app.components.common.card.authRegister.title") }}
    </template>
    <template #description>
      {{ $t("app.components.common.card.authRegister.description") }}
    </template>
    <template #button>
      <UiButton to="/auth/register" class="px-5 py-1.5 shadow-xl">
        {{ $t("app.components.common.card.authRegister.button") }}
      </UiButton>
    </template>
  </UiIntroductionCard>
</template>
