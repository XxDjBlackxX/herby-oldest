<script lang="ts" setup>
import {
  PERMISSIONS,
  hasPermission,
  type Permission,
} from "@repo/permission-utils";

const { sessionStore, t, route } = useImports();

const currentUser = computed(() => {
  return sessionStore._getUser;
});

const groups = [
  {
    label: t("app.layouts.admin.sidebarItems.index.index"),
    items: [
      {
        title: t("app.layouts.admin.sidebarItems.index.homepage"),
        icon: "House",
        disabled: !hasPermission(currentUser.value?.permission, [
          PERMISSIONS.admin,
          PERMISSIONS.financier,
          PERMISSIONS.moderator,
          PERMISSIONS.supervisory,
        ]),
        to: "/admin",
      },
      {
        title: t("app.layouts.admin.sidebarItems.index.searchUser"),
        icon: "Search",
        to: "/admin/search-user",
        disabled: !hasPermission(currentUser.value?.permission, [
          PERMISSIONS.moderator,
          PERMISSIONS.admin,
        ]),
      },
    ],
  },
  {
    label: t("app.layouts.admin.sidebarItems.supervisory.index"),
    items: [
      {
        title: t("app.layouts.admin.sidebarItems.supervisory.applications"),
        icon: "Archive",
        disabled: !hasPermission(
          currentUser.value?.permission,
          PERMISSIONS.supervisory,
        ),
        to: "/admin/supervisory/applications",
      },
    ],
  },
  {
    label: t("app.layouts.admin.sidebarItems.finance.index"),
    items: [
      {
        title: t("app.layouts.admin.sidebarItems.finance.analytics"),
        icon: "ChartBarStacked",
        disabled: !hasPermission(
          currentUser.value?.permission,
          PERMISSIONS.financier,
        ),
        to: "/admin/finance/analytics",
      },
      {
        title: t("app.layouts.admin.sidebarItems.finance.currencies"),
        icon: "Banknote",
        disabled: !hasPermission(
          currentUser.value?.permission,
          PERMISSIONS.financier,
        ),
        to: "/admin/finance/currencies",
      },
      {
        title: t("app.layouts.admin.sidebarItems.finance.transactions"),
        icon: "ArrowLeftRight",
        disabled: !hasPermission(
          currentUser.value?.permission,
          PERMISSIONS.financier,
        ),
        to: "/admin/finance/transactions",
      },
    ],
  },
];

interface Props {
  perms?: Permission | Permission[];
}

const props = defineProps<Props>();

const isLoaded = ref(false);

onMounted(() => {
  if (
    props.perms &&
    !hasPermission(currentUser.value?.permission, props.perms)
  ) {
    navigateTo("/");
  } else {
    isLoaded.value = true;
  }
});

useSeo({
  title: t("app.layouts.admin.title"),
  image: "https://herby.cat/assets/favicon.ico",
  type: "website",
});
</script>

<template>
  <UiSidebarProvider v-if="isLoaded">
    <UiSidebar variant="floating" collapsible="icon">
      <UiSidebarHeader>
        <UiSidebarMenu>
          <UiSidebarMenuItem>
            <SharedProfileSidebarDropdown />
          </UiSidebarMenuItem>
        </UiSidebarMenu>
        <UiSidebarSeparator />
      </UiSidebarHeader>
      <UiSidebarContent>
        <UiSidebarGroup v-for="group in groups" :key="group.label">
          <UiSidebarGroupLabel>{{ group.label }}</UiSidebarGroupLabel>
          <UiSidebarMenu>
            <UiSidebarMenuItem v-for="item in group.items" :key="item.title">
              <UiSidebarMenuButton as-child :aria-disabled="item.disabled">
                <NuxtLink :to="item.to">
                  <Icon :name="item.icon" />
                  <span>{{ item.title }}</span>
                </NuxtLink>
              </UiSidebarMenuButton>
            </UiSidebarMenuItem>
          </UiSidebarMenu>
        </UiSidebarGroup>
      </UiSidebarContent>
      <UiSidebarRail />
    </UiSidebar>
    <UiSidebarInset class="container">
      <header
        class="flex h-16 my-3 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12"
      >
        <div class="flex items-center gap-2">
          <UiSidebarTrigger class="-ml-1" />
          <UiSeparator orientation="vertical" class="mr-2 h-4" />
          <UiBreadcrumb>
            <UiBreadcrumbList>
              <UiBreadcrumbItem>
                <UiBreadcrumbLink to="/">
                  {{ $t("app.layouts.admin.breadcrumb.homepage") }}
                </UiBreadcrumbLink>
              </UiBreadcrumbItem>
              <UiBreadcrumbSeparator />
              <UiBreadcrumbItem>
                <UiBreadcrumbLink to="/admin">
                  {{ $t("app.layouts.admin.breadcrumb.admin") }}
                </UiBreadcrumbLink>
              </UiBreadcrumbItem>
              <template
                v-for="(segment, index) in route.path
                  .split('/')
                  .slice(2)
                  .slice(0, -1)"
                :key="index"
              >
                <UiBreadcrumbSeparator />
                <UiBreadcrumbItem>
                  <UiBreadcrumbLink
                    :to="`/admin/${route.path
                      .split('/')
                      .filter((v) => v.length)
                      .slice(1, index + 2)
                      .join('/')}`"
                  >
                    {{ $t(`app.layouts.admin.breadcrumb.${segment}`) }}
                  </UiBreadcrumbLink>
                </UiBreadcrumbItem>
              </template>
              <template
                v-for="(segment, index) in route.path
                  .split('/')
                  .filter((v) => v.length)
                  .slice(1)
                  .slice(-1)"
                :key="index"
              >
                <UiBreadcrumbSeparator />
                <UiBreadcrumbItem>
                  <UiBreadcrumbPage>
                    {{
                      $t(`app.layouts.admin.breadcrumb.${segment}`) ==
                      `app.layouts.admin.breadcrumb.${segment}`
                        ? segment
                        : $t(`app.layouts.admin.breadcrumb.${segment}`)
                    }}
                  </UiBreadcrumbPage>
                </UiBreadcrumbItem>
              </template>
            </UiBreadcrumbList>
          </UiBreadcrumb>
        </div>
      </header>
      <div class="flex flex-col items-start w-full gap-10">
        <slot />
      </div>
      <div class="mb-2.5 mt-10">
        <CommonFooter />
      </div>
    </UiSidebarInset>
  </UiSidebarProvider>
  <UiPreloadSubPage v-else class="mt-24" />
</template>
