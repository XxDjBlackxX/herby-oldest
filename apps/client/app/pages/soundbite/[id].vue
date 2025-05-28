<script lang="ts" setup>
import type { Soundbite } from "@repo/client-types";

const { route, t } = useImports();

const isLoaded = ref(false);
const soundbite = ref({} as Soundbite);

onMounted(async () => {
  try {
    const response = await putReq(`/soundbites/${route.params.id}`);
    soundbite.value = response.data.data;
    useSeoMeta({
      title: soundbite.value.title,
      ogTitle: soundbite.value.title,
      ogImage: soundbite.value.thumbnail,
    });
  } catch (err) {
    navigateTo("/soundbite/discover");
    console.error(err);
  } finally {
    isLoaded.value = true;
  }
});

definePageMeta({
  middleware: "authentication",
});
</script>

<template>
  <NuxtLayout name="app" footer class="my-36">
    <div
      v-if="isLoaded && soundbite"
      class="flex max-sm:flex-col items-start gap-10 w-full"
    >
      <div class="w-full sm:max-w-[250px]">
        <SoundbitePlayerCard :item="soundbite" width="%100" />
      </div>
      <div class="flex flex-col items-start w-full gap-2">
        <div class="flex justify-between w-full">
          <UiTypographyTitle> {{ soundbite.title }}</UiTypographyTitle>
          <SoundbiteRippleMenu :item="soundbite" />
        </div>
        <p class="text-typography-500">
          {{ t("common.by") }}
          <SharedProfileHoverCard :id="soundbite.author.id">
            {{ soundbite.author.username }}
          </SharedProfileHoverCard>
        </p>
        <SoundbiteLikeButton :item="soundbite" />
        <div class="flex flex-col w-full mt-5 gap-y-5">
          <template v-if="soundbite.broadcasters.length">
            <UiSeparator
              :label="$t('app.pages.soundbite.index.separator.broadcasters')"
            />
            <div
              class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5"
            >
              <UiCard
                v-for="(broadcaster, index) in soundbite.broadcasters"
                :key="index"
              >
                <UiCardContent class="flex items-center gap-x-2">
                  <UiImage
                    :src="broadcaster.user.avatar.url"
                    :alt="broadcaster.user.username"
                    class="w-8 h-8 border-2 border-surface-300"
                  >
                    <template #fallback>
                      {{ broadcaster.user.avatar.fallback }}
                    </template>
                  </UiImage>
                  <UiHrefButton
                    :href="`/b/${broadcaster.user.username}`"
                    target="_blank"
                    >{{ broadcaster.user.username }}</UiHrefButton
                  >
                </UiCardContent>
              </UiCard>
            </div>
          </template>
        </div>
      </div>
    </div>
    <template v-else>
      <div class="flex max-sm:flex-col items-start w-full h-full gap-2">
        <SoundbiteSkeletonPlayerCard class="sm:max-w-[250px]" />
        <div class="flex flex-col gap-2 w-full">
          <UiSkeletonText :height="40" />
          <UiSkeleton class="h-5 w-16" />
        </div>
      </div>
    </template>
  </NuxtLayout>
</template>
