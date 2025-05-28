<script setup lang="ts">
import { PERMISSIONS } from "@repo/permission-utils";

const query = ref("");

definePageMeta({
  middleware: "authentication",
});
</script>

<template>
  <NuxtLayout
    name="admin"
    :perms="[
      PERMISSIONS.admin,
      PERMISSIONS.financier,
      PERMISSIONS.moderator,
      PERMISSIONS.supervisory,
    ]"
  >
    <UiSearchBar @search="(q) => (query = q)" />
    <UiSuperPaginatedTable
      united="introduction-card"
      :items-per-page="30"
      item-key="users"
      :request="{ url: `/search/${query || 'x'}`, body: { target: 'users' } }"
      :heads="[
        {
          name: $t('app.pages.admin.index.searchUser.table.head.avatar'),
          value: 'avatar',
        },
        {
          name: $t('app.pages.admin.index.searchUser.table.head.username'),
          value: 'username',
        },
        {
          name: $t('app.pages.admin.index.searchUser.table.head.email'),
          value: 'email',
        },
        {
          name: $t('app.pages.admin.index.searchUser.table.head.id'),
          value: 'id',
        },
        {
          value: 'submit',
        },
      ]"
    >
      <template #avatar="{ value }">
        <UiImage class="w-8 h-8" :src="value.url">
          <template #fallback>
            {{ value.fallback }}
          </template>
        </UiImage>
      </template>
      <template #username="{ value }">
        {{ value }}
      </template>
      <template #email="{ value }">
        <div class="flex items-center gap-2 whitespace-nowrap">
          {{ value }}
          <UiCopyButton :source="value" />
        </div>
      </template>
      <template #id="{ value }">
        <div class="flex items-center gap-2 whitespace-nowrap">
          {{ value }}
          <UiCopyButton :source="value" />
        </div>
      </template>
      <template #submit="{ item }">
        <UiButton variant="ghost" class="p-2" :to="`/admin/users/${item.id}`">
          <IconSquareArrowOutUpRight :size="16" />
        </UiButton>
      </template>
    </UiSuperPaginatedTable>
  </NuxtLayout>
</template>
