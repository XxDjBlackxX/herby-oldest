<script setup lang="ts">
import type { Application } from "@repo/client-types";
import { APPLICATION_STATUS } from "../../../../constants/data";
import { PERMISSIONS } from "@repo/permission-utils";

interface SuperApplication extends Application {
  waiting: boolean;
}

const activeTab = ref("pending" as "pending" | "success" | "in-progress");

async function onUpdateStatus(item: SuperApplication, value: any) {
  item.waiting = true;
  postReq(`/admin/manage/applications/${item.id}/status/${value}`)
    .then(() => {
      item.status = value as "pending";
      item.waiting = false;
    })
    .catch(() => {});
}

definePageMeta({
  middleware: "authentication",
});
</script>

<template>
  <NuxtLayout name="admin" :perms="PERMISSIONS.supervisory">
    <UiTabs v-model="activeTab" default-value="pending">
      <UiTabsList>
        <UiTabsTrigger value="pending">
          {{ $t("app.pages.admin.supervisory.applications.tabs.pending") }}
        </UiTabsTrigger>
        <UiTabsTrigger value="in-progress">
          {{ $t("app.pages.admin.supervisory.applications.tabs.inProgress") }}
        </UiTabsTrigger>
        <UiTabsTrigger value="success">
          {{ $t("app.pages.admin.supervisory.applications.tabs.success") }}
        </UiTabsTrigger>
      </UiTabsList>
      <UiTabsContent :value="activeTab" united="introduction-card">
        <UiSuperPaginatedTable
          :items-per-page="30"
          item-key="applications"
          :request="{ url: `/admin/data/applications/${activeTab}` }"
          :heads="[
            {
              name: $t(
                'app.pages.admin.supervisory.applications.table.head.author',
              ),
              value: 'author',
            },
            {
              name: $t(
                'app.pages.admin.supervisory.applications.table.head.type',
              ),
              value: 'type',
            },
            {
              name: $t(
                'app.pages.admin.supervisory.applications.table.head.supervisory',
              ),
              value: 'supervisory',
            },
            {
              name: $t(
                'app.pages.admin.supervisory.applications.table.head.status',
              ),
              value: 'status',
            },
            {
              name: $t(
                'app.pages.admin.supervisory.applications.table.head.id',
              ),
              value: 'id',
            },
          ]"
        >
          <template #author="{ value }">
            <UiButton
              variant="ghost"
              class="flex items-center gap-2 p-2"
              :to="`/admin/users/${value.id}`"
            >
              <UiImage
                class="w-8 h-8"
                v-if="value.avatar"
                :src="value.avatar.url"
              >
                <template #fallback>
                  {{ value.avatar.fallback }}
                </template>
              </UiImage>
              {{ value.username }}
              <IconSquareArrowOutUpRight :size="16" />
            </UiButton>
          </template>
          <template #type="{ value }">
            {{
              $t(
                `app.pages.admin.supervisory.applications.table.cell.type.${value}`,
              )
            }}
          </template>
          <template #supervisory="{ value }">
            <UiHrefButton v-if="value" :href="`/admin/users/${value.id}`">{{
              value.username
            }}</UiHrefButton>
            <template v-else>
              {{
                $t(
                  `app.pages.admin.supervisory.applications.table.cell.supervisory`,
                )
              }}
            </template>
          </template>
          <template #status="{ item }">
            <UiSelect
              @update:model-value="(v) => onUpdateStatus(item, v)"
              :default-value="item.status"
              :disabled="item.status == 'success' || item.status == 'canceled'"
            >
              <UiSelectTrigger size="sm" :waiting="item.waiting">
                {{
                  $t(
                    `app.pages.admin.supervisory.applications.table.cell.status.placeholder.${item.status}`,
                  )
                }}
              </UiSelectTrigger>
              <UiSelectContent :side-offset="5">
                <UiSelectGroup>
                  <UiSelectItem
                    v-for="(status, index) in APPLICATION_STATUS.filter(
                      (s) => !['pending', item.status].includes(s),
                    )"
                    :key="index"
                    :value="status"
                  >
                    {{
                      $t(
                        `app.pages.admin.supervisory.applications.table.cell.status.options.${status}`,
                      )
                    }}
                  </UiSelectItem>
                </UiSelectGroup>
              </UiSelectContent>
            </UiSelect>
          </template>
          <template #id="{ value }">
            <div class="flex items-center gap-2 whitespace-nowrap">
              {{ value }}
              <UiCopyButton :source="value" />
            </div>
          </template>
        </UiSuperPaginatedTable>
      </UiTabsContent>
    </UiTabs>
  </NuxtLayout>
</template>
