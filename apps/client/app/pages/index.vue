<script lang="ts" setup>
import type { Soundbite } from "@repo/client-types";

const { runtimeConfig } = useImports();

const soundbites = ref([] as Soundbite[]);

onMounted(() => {
  if (!soundbites.value.length) {
    putReq("/discover/most-liked", {
      limit: {
        before: 50,
        after: 0,
      },
      target: "soundbite",
    })
      .then((response) => (soundbites.value = response.data.data.soundbites))
      .catch(console.error);
  }
});
definePageMeta({ middleware: "authentication" });
</script>

<template>
  <NuxtLayout name="app" footer class="flex flex-col items-center gap-10">
    <UiHeroParallax :items="soundbites || []" class="h-[2200px]">
      <template #item="item">
        <SoundbitePlayerCard :width="300" :height="300" :item="item" />
      </template>
      <template #header>
        <div class="flex flex-col items-center gap-5 max-w-sm text-center">
          <h1 class="text-7xl sm:text-9xl text-md uppercase font-mega">
            {{ runtimeConfig.app.TITLE }}
          </h1>
          <p class="text-typography-500 font-light text-xl sm:text-3xl">
            {{ $t("app.pages.index.description") }}
          </p>
          <UiMagicButton
            to="/soundbite/discover/"
            class="flex items-center gap-4 w-fit px-4 py-3"
          >
            <IconRocket :size="16" />
            {{ $t("app.pages.index.button") }}
          </UiMagicButton>
        </div>
      </template>
    </UiHeroParallax>
    <UiSeparator :label="$t('app.pages.index.separator.tools')" />
    <PageCardDiscoverSoundbite />
    <PageCardCreateSoundbite />
    <PageCardSettings />
    <PageCardDashboard />
  </NuxtLayout>
</template>
