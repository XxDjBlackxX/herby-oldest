<script setup lang="ts">
import { PERMISSIONS } from "@repo/permission-utils";

const { t } = useImports();

const layout = reactive({
  perms: PERMISSIONS.user,
  title: t("app.pages.settings.applications.view.title"),
});

definePageMeta({ middleware: "authentication" });
</script>

<template>
  <NuxtLayout name="settings" v-bind="layout">
    <UiSuperPaginatedTable
      :items-per-page="10"
      item-key="applications"
      :request="{ url: '/users/me/content/applications' }"
      :heads="[
        {
          name: $t('app.pages.settings.applications.view.table.head.status'),
          value: 'status',
        },
        {
          name: $t('app.pages.settings.applications.view.table.head.type'),
          value: 'type',
        },
        {
          name: $t(
            'app.pages.settings.applications.view.table.head.supervisory',
          ),
          value: 'supervisory',
        },
        {
          name: $t('app.pages.settings.applications.view.table.head.id'),
          value: 'id',
        },
      ]"
    >
      <template #status="{ value }">
        <UiBadge :variant="value">
          {{
            $t(
              `app.pages.settings.applications.view.table.cell.status.${value}`,
            )
          }}
        </UiBadge>
      </template>
      <template #type="{ value }">
        {{
          $t(`app.pages.settings.applications.view.table.cell.type.${value}`)
        }}
      </template>
      <template #supervisory="{ value }">
        <UiHrefButton v-if="value" :href="`/u/${value.username}`">{{
          value.username
        }}</UiHrefButton>
        <template v-else>
          {{
            $t("app.pages.settings.applications.view.table.cell.supervisory")
          }}
        </template>
      </template>
      <template #id="{ value }">
        <span class="flex items-center gap-2 whitespace-nowrap">
          {{ value }}
          <UiCopyButton :source="value" />
        </span>
      </template>
    </UiSuperPaginatedTable>
  </NuxtLayout>
</template>
