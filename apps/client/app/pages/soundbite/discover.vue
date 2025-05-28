<script lang="ts" setup>
const { t } = useImports();

const activeTab = ref("most-liked");

useSeo({
  title: t("app.pages.soundbite.discover.meta.title"),
  description: t("app.pages.soundbite.discover.meta.description"),
});

definePageMeta({
  middleware: "authentication",
});
</script>

<template>
  <NuxtLayout
    name="app"
    footer
    custom-seo
    class="flex flex-col items-center gap-y-10 mt-24"
  >
    <h1 class="font-bold text-3xl sm:text-5xl whitespace-nowrap">
      {{ $t("app.pages.soundbite.discover.title") }}
    </h1>
    <UiTabs
      v-model="activeTab"
      default-value="most-liked"
      variant="selectable"
      align="center"
    >
      <UiTabsList>
        <UiTabsTrigger value="most-liked">
          {{ $t("app.pages.soundbite.discover.tabs.mostLiked") }}
        </UiTabsTrigger>
        <UiTabsTrigger value="new-uploads">
          {{ $t("app.pages.soundbite.discover.tabs.newUploads") }}
        </UiTabsTrigger>
        <UiTabsTrigger value="most-added-broadcast-content">
          {{
            $t("app.pages.soundbite.discover.tabs.mostAddedBroadcastContent")
          }}
        </UiTabsTrigger>
      </UiTabsList>
      <UiTabsContent :value="activeTab">
        <UiSuperPaginatedItems
          :items-per-page="80"
          item-key="soundbites"
          :request="{
            url: `/discover/${activeTab}`,
            body: { target: 'soundbite' },
          }"
          class="w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5"
        >
          <template #item="item">
            <SoundbitePlayerCard :item="item" />
          </template>
          <template #skeleton>
            <SoundbiteSkeletonPlayerCard />
          </template>
        </UiSuperPaginatedItems>
      </UiTabsContent>
    </UiTabs>
  </NuxtLayout>
</template>
