<template>
  <UiIntroductionCard>
    <template #icon>
      <IconCompass :size="60" />
    </template>
    <template #title>
      {{ $t("app.components.common.card.discoverSoundbite.title") }}
    </template>
    <template #description>
      {{ $t("app.components.common.card.discoverSoundbite.description") }}
    </template>
    <template #button>
      <UiButton to="/soundbite/discover" class="px-5 py-1.5 shadow-xl">
        {{ $t("app.components.common.card.discoverSoundbite.button") }}
      </UiButton>
    </template>
  </UiIntroductionCard>
</template>
