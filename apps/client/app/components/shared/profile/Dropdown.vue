<script lang="ts" setup>
import { PERMISSIONS, hasPermission } from "@repo/permission-utils";

const { sessionStore } = useImports();

const currentUser = computed(() => {
  return sessionStore._getUser;
});

function onLogout() {
  const session = useSession();
  session.logout();
  window.location.reload();
}
</script>

<template>
  <UiDropdownMenu v-if="currentUser">
    <UiDropdownMenuTrigger>
      <UiImage
        :src="currentUser.profile.avatar.url"
        :alt="currentUser.username"
        class="w-9 h-9"
        shape="circle"
      >
        <template #fallback>{{ currentUser.profile.avatar.fallback }}</template>
      </UiImage>
    </UiDropdownMenuTrigger>
    <UiDropdownMenuContent
      class="space-y-1 w-[300px]"
      align="end"
      side="bottom"
    >
      <UiDropdownMenuItem :to="`/u/${currentUser.username}`">
        <IconUser :size="16" />
        {{ $t("app.components.shared.profile.dropdown.button.profile") }}
      </UiDropdownMenuItem>
      <UiDropdownMenuItem
        v-if="hasPermission(currentUser.permission, PERMISSIONS.broadcaster)"
        :to="`/b/${currentUser.username}`"
      >
        <IconTvMinimal :size="16" />
        {{
          $t("app.components.shared.profile.dropdown.button.broadcastProfile")
        }}
      </UiDropdownMenuItem>
      <UiDropdownMenuItem to="/settings/profile/edit">
        <IconCog :size="16" />
        {{ $t("app.components.shared.profile.dropdown.button.settings") }}
      </UiDropdownMenuItem>
      <UiDropdownMenuItem to="/dashboard">
        <IconLayoutDashboard :size="16" />
        {{ $t("app.components.shared.profile.dropdown.button.dashboard") }}
      </UiDropdownMenuItem>
      <UiDropdownMenuItem to="/soundbite/create">
        <IconPencil :size="16" />
        {{
          $t("app.components.shared.profile.dropdown.button.createSoundbite")
        }}
      </UiDropdownMenuItem>
      <UiDropdownMenuSeparator class="my-1" />
      <UiDropdownMenuItem variant="danger" external @click="onLogout">
        <IconLogOut :size="16" />
        {{ $t("app.components.shared.profile.dropdown.button.logout") }}
      </UiDropdownMenuItem>
    </UiDropdownMenuContent>
  </UiDropdownMenu>
</template>
