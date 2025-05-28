<script setup lang="ts">
import { PERMISSIONS } from "@repo/permission-utils";

const { sessionStore } = useImports();

const currentUser = computed(() => {
  return sessionStore._getUser;
});

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
      PERMISSIONS.supervisory,
      PERMISSIONS.moderator,
    ]"
  >
    <div class="flex flex-col items-start max-w-lg gap-5">
      <h1 class="text-4xl font-bold">
        {{ $t("app.pages.admin.index.homepage.title") }}
        <strong class="text-primary-500">{{ currentUser?.username }}</strong>
      </h1>
      <p class="text-lg text-typography-400">
        {{ $t("app.pages.admin.index.homepage.description") }}
      </p>
    </div>
  </NuxtLayout>
</template>
