<template>
  <UiIntroductionCard>
    <template #icon>
      <IconPencil :size="60" />
    </template>
    <template #title>
      {{ $t("app.components.common.card.createSoundbite.title") }}
    </template>
    <template #description>
      {{ $t("app.components.common.card.createSoundbite.description") }}
    </template>
    <template #button>
      <UiButton to="/soundbite/create" class="px-5 py-1.5 shadow-xl">
        {{ $t("app.components.common.card.createSoundbite.button") }}
      </UiButton>
    </template>
  </UiIntroductionCard>
</template>
