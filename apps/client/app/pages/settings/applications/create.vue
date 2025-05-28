<script setup lang="ts">
import { PERMISSIONS } from "@repo/permission-utils";

const { t } = useImports();

const layout = reactive({
  perms: PERMISSIONS.user,
  title: t("app.pages.settings.applications.create.title"),
});

definePageMeta({ middleware: "authentication" });
</script>

<template>
  <NuxtLayout name="settings" v-bind="layout">
    <UiIntroductionCard>
      <template #icon>
        <IconTvMinimal :size="60" />
      </template>
      <template #title>
        {{
          $t("app.pages.settings.applications.create.items.broadcaster.title")
        }}
      </template>
      <template #description>
        {{
          $t(
            "app.pages.settings.applications.create.items.broadcaster.description",
          )
        }}
      </template>
      <template #button>
        <UiButton to="/applications/broadcaster" class="px-5 py-1.5 shadow-xl">
          {{
            $t(
              "app.pages.settings.applications.create.items.broadcaster.button",
            )
          }}
        </UiButton>
      </template>
    </UiIntroductionCard>
  </NuxtLayout>
</template>
