<template>
  <UiIntroductionCard>
    <template #icon>
      <IconLockKeyhole :size="60" />
    </template>
    <template #title>
      {{ $t("app.components.common.card.authForgotPassword.title") }}
    </template>
    <template #description>
      {{ $t("app.components.common.card.authForgotPassword.description") }}
    </template>
    <template #button>
      <UiButton to="/auth/forgot-password" class="px-5 py-1.5 shadow-xl">
        {{ $t("app.components.common.card.authForgotPassword.button") }}
      </UiButton>
    </template>
  </UiIntroductionCard>
</template>
