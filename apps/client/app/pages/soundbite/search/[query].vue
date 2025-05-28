<script lang="ts" setup>
const { route } = useImports();

useSeo({
  title: typeof route.params.query == "string" ? route.params.query : "x",
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
    <div class="flex flex-col items-center">
      <h1 class="font-bold text-3xl sm:text-5xl whitespace-nowrap">
        {{ $t("app.pages.soundbite.search.title") }}
      </h1>
      <p
        class="font-light text-xl sm:text-2xl whitespace-nowrap text-typography-300"
      >
        {{ route.params.query }}
      </p>
    </div>
    <UiAdvancedPaginatedItems
      :items-per-page="32"
      item-key="soundbites"
      :request="{
        url: `/search/${route.params.query}`,
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
    </UiAdvancedPaginatedItems>
  </NuxtLayout>
</template>
