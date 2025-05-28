<script setup lang="ts">
import {
  PERMISSIONS,
  hasPermission,
  getPermissions,
  type PermissionKey,
} from "@repo/permission-utils";
import type { User } from "@repo/client-types";

const { route, sessionStore } = useImports();

const currentUser = computed(() => {
  return sessionStore._getUser;
});

const permissions: Record<PermissionKey, { value: boolean; waiting: boolean }> =
  reactive(
    Object.fromEntries(
      Object.keys(PERMISSIONS).map((key) => [
        key,
        {
          value: false,
          waiting: false,
        },
      ]),
    ) as Record<PermissionKey, { value: boolean; waiting: boolean }>,
  );

const { data: userData, pending } = await useAsyncData(
  `user-${route.params.id}`,
  async () => {
    const response = await putReq(`/admin/data/users/${route.params.id}`).catch(
      () => {
        navigateTo("/admin/users/search");
      },
    );

    const user = response.data.data as User;

    for (const perm of getPermissions(user.permission)) {
      permissions[perm].value = true;
    }

    return user;
  },
);

async function onUpdatePermission(key: keyof typeof permissions) {
  permissions[key].waiting = true;
  postReq(`/admin/manage/users/${route.params.id}/permission/${key}`)
    .then((response) => {
      permissions[key].value = response.data.data;
      permissions[key].waiting = false;
    })
    .catch(() => {});
}

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
    <UiTabs default-value="display">
      <UiTabsList>
        <UiTabsTrigger value="display">
          {{ $t("app.pages.admin.users.id.tabs.display") }}
        </UiTabsTrigger>
        <UiTabsTrigger
          :disabled="
            !hasPermission(currentUser?.permission, [
              PERMISSIONS.admin,
              PERMISSIONS.supervisory,
            ])
          "
          value="permissions"
        >
          {{ $t("app.pages.admin.users.id.tabs.permissions") }}
        </UiTabsTrigger>
      </UiTabsList>
      <UiPreloadSubPage v-if="pending" class="mt-5" />
      <template v-else-if="userData && !pending">
        <UiTabsContent value="display">
          <div class="flex flex-col gap-y-10" united="introduction-card">
            <div class="flex max-md:flex-col items-center gap-10">
              <UiItemField aria-disabled>
                <template #label>
                  {{ $t("app.pages.admin.users.id.display.name") }}
                </template>
                <template #item>
                  <UiInput disabled :default-value="userData.name" />
                </template>
              </UiItemField>
              <UiItemField aria-disabled>
                <template #label>
                  {{ $t("app.pages.admin.users.id.display.surname") }}
                </template>
                <template #item>
                  <UiInput disabled :default-value="userData.surname" />
                </template>
              </UiItemField>
            </div>
            <UiItemField aria-disabled>
              <template #label>
                {{ $t("app.pages.admin.users.id.display.username") }}
              </template>
              <template #item>
                <UiInput disabled :default-value="userData.username" />
              </template>
            </UiItemField>
            <UiItemField aria-disabled>
              <template #label>
                {{ $t("app.pages.admin.users.id.display.description") }}
              </template>
              <template #item>
                <UiTextarea disabled :default-value="userData.description" />
              </template>
            </UiItemField>
            <UiItemField aria-disabled>
              <template #label>
                {{ $t("app.pages.admin.users.id.display.email") }}
              </template>
              <template #item>
                <UiInput disabled :default-value="userData.email" />
              </template>
            </UiItemField>
          </div>
        </UiTabsContent>
        <UiTabsContent class="flex flex-col gap-y-10" value="permissions">
          <UiCard class="p-10">
            <UiCardContent class="flex flex-col gap-y-10">
              <UiItemField
                v-for="(_, key) in permissions"
                :key="key"
                :waiting="permissions[key].waiting"
                variant="switch"
              >
                <template #label>
                  {{ $t(`app.pages.admin.users.id.permissions.${key}.label`) }}
                </template>
                <template #description>
                  {{
                    $t(
                      `app.pages.admin.users.id.permissions.${key}.description`,
                    )
                  }}
                </template>
                <template #item>
                  <UiSwitch
                    :modelValue="permissions[key].value"
                    @update:modelValue="onUpdatePermission(key)"
                  />
                </template>
              </UiItemField>
            </UiCardContent>
          </UiCard>
        </UiTabsContent>
      </template>
    </UiTabs>
  </NuxtLayout>
</template>
