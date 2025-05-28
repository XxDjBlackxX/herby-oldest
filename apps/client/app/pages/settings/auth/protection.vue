<script lang="ts" setup>
import { PERMISSIONS } from "@repo/permission-utils";

const { sessionStore, t, toast } = useImports();

const enabled = ref(!!sessionStore._getUser?.identity?.protection?.login);
const isWaiting = ref(false);

const layout = reactive({
  perms: PERMISSIONS.user,
  title: t("app.pages.settings.auth.protection.title"),
});

async function onChange() {
  if (!sessionStore.user) return;
  isWaiting.value = true;
  try {
    await postReq("/auth/protection/login", { enabled: enabled.value });

    sessionStore.user.identity.protection.login = enabled.value;

    toast.success(t("app.pages.settings.auth.protection.toast.success"));
  } catch {
    toast.error(t("app.pages.settings.auth.protection.toast.error"));
  } finally {
    isWaiting.value = false;
  }
}

definePageMeta({ middleware: "authentication" });
</script>

<template>
  <NuxtLayout name="settings" v-bind="layout">
    <UiItemField variant="switch">
      <template #label>{{
        t("app.pages.settings.auth.protection.items.login.label")
      }}</template>
      <template #description>{{
        t("app.pages.settings.auth.protection.items.login.description")
      }}</template>
      <template #item>
        <UiSwitch v-model="enabled" />
      </template>
    </UiItemField>
    <UiButton
      class="px-4 py-2"
      :waiting="isWaiting"
      variant="danger"
      @click="onChange"
    >
      {{ t("app.pages.settings.auth.protection.button") }}
    </UiButton>
  </NuxtLayout>
</template>
