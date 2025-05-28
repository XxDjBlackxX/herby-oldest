<template>
  <UiIntroductionCard>
    <template #icon>
      <IconLogIn :size="60" />
    </template>
    <template #title>
      {{ $t("app.components.common.card.authLogin.title") }}
    </template>
    <template #description>
      {{ $t("app.components.common.card.authLogin.description") }}
    </template>
    <template #button>
      <UiButton to="/auth/login" class="px-5 py-1.5 shadow-xl">
        {{ $t("app.components.common.card.authLogin.button") }}
      </UiButton>
    </template>
  </UiIntroductionCard>
</template>
