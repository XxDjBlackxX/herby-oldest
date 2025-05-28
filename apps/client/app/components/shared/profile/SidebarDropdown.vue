<script lang="ts" setup>
import { PERMISSIONS, hasPermission } from "@repo/permission-utils";

const { sessionStore } = useImports();

const currentUser = computed(() => {
  return sessionStore._getUser;
});
</script>

<template>
  <UiDropdownMenu v-if="currentUser">
    <UiDropdownMenuTrigger class="w-full">
      <UiSidebarMenuButton
        size="lg"
        class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
      >
        <UiImage
          shape="square"
          class="w-8 h-8"
          :src="currentUser.profile.avatar.url"
          :alt="currentUser.username"
        >
          <template #fallback>
            {{ currentUser.profile.avatar.fallback }}
          </template>
        </UiImage>
        <div class="grid flex-1 text-left text-base leading-tight">
          {{ currentUser.username }}
        </div>
        <IconChevronsUpDown class="ml-auto" />
      </UiSidebarMenuButton>
    </UiDropdownMenuTrigger>
    <UiDropdownMenuContent
      class="space-y-1 w-[--reka-dropdown-menu-trigger-width] min-w-56"
      align="start"
      side="bottom"
    >
      <UiDropdownMenuItem to="/">
        <IconHouse :size="16" />
        {{
          $t("app.components.shared.profile.sidebarDropdown.button.homepage")
        }}
      </UiDropdownMenuItem>
      <UiDropdownMenuItem :to="`/u/${currentUser.username}`">
        <IconUser :size="16" />
        {{ $t("app.components.shared.profile.sidebarDropdown.button.profile") }}
      </UiDropdownMenuItem>
      <UiDropdownMenuItem
        v-if="hasPermission(currentUser.permission, PERMISSIONS.broadcaster)"
        :to="`/b/${currentUser.username}`"
      >
        <IconTvMinimal :size="16" />
        {{
          $t(
            "app.components.shared.profile.sidebarDropdown.button.broadcastProfile",
          )
        }}
      </UiDropdownMenuItem>
      <UiDropdownMenuItem to="/settings/profile/edit">
        <IconCog :size="16" />
        {{
          $t("app.components.shared.profile.sidebarDropdown.button.settings")
        }}
      </UiDropdownMenuItem>
      <UiDropdownMenuItem to="/soundbite/create">
        <IconPencil :size="16" />
        {{
          $t(
            "app.components.shared.profile.sidebarDropdown.button.createSoundbite",
          )
        }}
      </UiDropdownMenuItem>
    </UiDropdownMenuContent>
  </UiDropdownMenu>
</template>
