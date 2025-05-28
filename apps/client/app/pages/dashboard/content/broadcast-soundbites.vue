<script setup lang="ts">
import { PERMISSIONS } from "@repo/permission-utils";
import type { ContentBroadcastSoundbite } from "@repo/client-types";

const { t, toast, sessionStore, runtimeConfig } = useImports();

const currentUser = computed(() => {
  return sessionStore._getUser;
});

const waiting = reactive({
  changeOrbit: {} as Record<string, boolean>,
});

const webhook = ref(
  `${runtimeConfig.app.SERVER_URL}/v1/webhook/${currentUser.value?.id}/soundbites`,
);

async function changeOrbit(item: ContentBroadcastSoundbite, orbit: number) {
  waiting.changeOrbit[item.id] = true;
  try {
    await postReq(
      `/users/content/manage/soundbites/${item.id}/broadcast/edit`,
      {
        orbit,
      },
    );
    item.orbit = orbit;
  } catch {
    toast.error(t("common.error.default"));
  } finally {
    waiting.changeOrbit[item.id] = false;
  }
}

definePageMeta({
  middleware: "authentication",
});
</script>

<template>
  <NuxtLayout name="dashboard" :perms="PERMISSIONS.broadcaster">
    <PageCardCreateSoundbite />
    <UiViewportCard>
      <template #start>
        <UiExploreArea>
          <UiTypographyDesc class="break-all pr-10">
            {{ webhook }}
          </UiTypographyDesc>
        </UiExploreArea>
      </template>
      <template #end>
        <UiCopyButton :source="webhook" />
      </template>
    </UiViewportCard>
    <UiSeparator
      :label="
        t(
          'app.pages.dashboard.content.broadcastSoundbites.separator.soundbites',
        )
      "
    />
    <UiAdvancedPaginatedTable
      :request="{ url: '/users/me/content/soundbites/broadcast' }"
      item-key="soundbites"
      :items-per-page="50"
      :heads="[
        {
          name: $t(
            'app.pages.dashboard.content.broadcastSoundbites.table.soundbite',
          ),
          value: 'soundbite',
        },
        {
          name: $t(
            'app.pages.dashboard.content.broadcastSoundbites.table.orbit',
          ),
          value: 'orbit',
        },
        {
          name: $t(
            'app.pages.dashboard.content.broadcastSoundbites.table.context',
          ),
          value: 'context',
        },
      ]"
    >
      <template #soundbite="{ item }">
        <span class="flex items-center gap-x-3">
          <SoundbiteMiniPlayer :item="item" />
          <span class="flex flex-col items-start gap-y-1">
            <h4 class="whitespace-nowrap">
              {{ item.title }}
            </h4>
            <p class="text-typography-500">
              {{ new Date(item.createdAt).toLocaleDateString() }}
            </p>
          </span>
        </span>
      </template>
      <template #orbit="{ item }">
        <UiEditableInput
          type="number"
          size="sm"
          :waiting="waiting.changeOrbit[item.id]"
          :value="item.orbit"
          :min="10"
          :max="99999"
          @submit="(orbit) => changeOrbit(item, orbit as number)"
        />
      </template>
      <template #context="{ item }">
        <SoundbiteRippleMenu :item="item" />
      </template>
    </UiAdvancedPaginatedTable>
  </NuxtLayout>
</template>
