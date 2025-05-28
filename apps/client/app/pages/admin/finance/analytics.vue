<script setup lang="ts">
import { tryOnMounted } from "@vueuse/core";
import { PERMISSIONS } from "@repo/permission-utils";

const data = ref({ orbit: [], balance: [] });
const isLoaded = ref(false);

tryOnMounted(async () =>
  putReq("/admin/data/analytics/payments")
    .then((response) => (data.value = response.data.data))
    .catch(console.error)
    .finally(() => (isLoaded.value = true)),
);
definePageMeta({
  middleware: "authentication",
});
</script>

<template>
  <NuxtLayout name="admin" :perms="PERMISSIONS.financier">
    <div class="flex max-sm:flex-col items-center w-full gap-10">
      <UiIntroductionCard>
        <template #icon>
          <UiDonutChart
            index="name"
            :category="'available'"
            :data="data.orbit"
          />
        </template>
        <template #title>
          {{ $t("app.pages.admin.finance.analytics.available.title") }}
        </template>
        <template #description>
          {{ $t("app.pages.admin.finance.analytics.available.description") }}
        </template>
      </UiIntroductionCard>
    </div>
    <UiIntroductionCard>
      <template #icon>
        <UiDonutChart index="name" :category="'pending'" :data="data.orbit" />
      </template>
      <template #title>
        {{ $t("app.pages.admin.finance.analytics.pending.title") }}
      </template>
      <template #description>
        {{ $t("app.pages.admin.finance.analytics.pending.description") }}
      </template>
    </UiIntroductionCard>
    <UiIntroductionCard>
      <template #icon>
        <UiDonutChart
          index="name"
          :category="'withdrawable'"
          :data="data.orbit"
        />
      </template>
      <template #title>
        {{ $t("app.pages.admin.finance.analytics.withdrawable.title") }}
      </template>
      <template #description>
        {{ $t("app.pages.admin.finance.analytics.withdrawable.description") }}
      </template>
    </UiIntroductionCard>
  </NuxtLayout>
</template>
