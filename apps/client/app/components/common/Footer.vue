<script lang="ts" setup>
import { PERMISSIONS, hasPermission } from "@repo/permission-utils";

const { sessionStore, runtimeConfig } = useImports();

const currentUser = computed(() => {
  return sessionStore._getUser;
});
</script>

<template>
  <footer
    united="introduction-card"
    class="flex flex-col items-start w-full gap-5 rounded-primary"
  >
    <ul>
      <li class="flex items-center gap-2">
        <IconLogo :size="30" />
        <h4
          class="flex items-center gap-x-3 whitespace-nowrap text-lg font-bold"
        >
          {{ runtimeConfig.app.TITLE }}
        </h4>
      </li>
      <li class="mt-2">
        <p class="text-sm text-typography-500">
          {{
            $t("app.components.common.footer.description", {
              title: runtimeConfig.app.TITLE,
            })
          }}
        </p>
      </li>
    </ul>
    <UiSeparator />
    <nav class="flex flex-wrap items-start justify-between gap-10 w-full">
      <ul>
        <li>
          <section class="flex flex-col items-start gap-4">
            <h5 class="flex items-center gap-2 text-sm font-[500] underline">
              {{ $t("app.components.common.footer.user.index") }}
            </h5>
            <UiHrefButton href="/auth/login">
              {{ $t("app.components.common.footer.user.login") }}
            </UiHrefButton>
            <UiHrefButton href="/auth/register">
              {{
                $t("app.components.common.footer.user.register")
              }}</UiHrefButton
            >
            <UiHrefButton href="/auth/forgot-password">
              {{
                $t("app.components.common.footer.user.forgotPassword")
              }}</UiHrefButton
            >
            <UiHrefButton href="/settings/profile/edit">
              {{
                $t("app.components.common.footer.user.settings")
              }}</UiHrefButton
            >
            <UiHrefButton
              v-if="
                hasPermission(currentUser?.permission, [
                  PERMISSIONS.admin,
                  PERMISSIONS.financier,
                  PERMISSIONS.supervisory,
                  PERMISSIONS.moderator,
                ])
              "
              href="/admin"
            >
              {{ $t("app.components.common.footer.user.admin") }}</UiHrefButton
            >
          </section>
        </li>
      </ul>
      <ul>
        <li>
          <section class="flex flex-col items-start gap-4">
            <h5 class="flex items-center gap-2 text-sm font-[500] underline">
              {{ $t("app.components.common.footer.soundbite.index") }}
            </h5>
            <UiHrefButton href="/soundbite/create">
              {{ $t("app.components.common.footer.soundbite.create") }}
            </UiHrefButton>
            <UiHrefButton href="/soundbite/discover">
              {{
                $t("app.components.common.footer.soundbite.discover")
              }}</UiHrefButton
            >
          </section>
        </li>
      </ul>
      <ul>
        <li>
          <section class="flex flex-col items-start gap-4">
            <h5 class="flex items-center gap-2 text-sm font-[500] underline">
              {{ $t("app.components.common.footer.app.index") }}
            </h5>
            <UiHrefButton href="/settings/displayed/language">
              {{ $t("app.components.common.footer.app.language") }}
            </UiHrefButton>
            <UiHrefButton href="`/settings/displayed/appearance`">
              {{
                $t("app.components.common.footer.app.appearance")
              }}</UiHrefButton
            >
          </section>
        </li>
      </ul>
    </nav>
    <UiSeparator />
    <nav>
      <ul>
        <li
          class="flex items-center gap-2 text-typography-50 font-medium text-sm"
        >
          <IconCopyright :size="16" /> {{ runtimeConfig.app.TITLE }} 2025
        </li>
      </ul>
    </nav>
  </footer>
</template>

<style scoped>
footer nav ul {
  min-width: 200px;
}
</style>
