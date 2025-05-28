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
    label: t("app.layouts.dashboard.sidebarItems.index.index"),
    items: [
      {
        title: t("app.layouts.dashboard.sidebarItems.index.homepage"),
        icon: "House",
        to: "/dashboard",
      },
    ],
  },
  {
    label: t("app.layouts.dashboard.sidebarItems.finance.index"),
    items: [
      {
        title: t("app.layouts.dashboard.sidebarItems.finance.paymentHistory"),
        icon: "ReceiptText",
        to: "/dashboard/finance/payment-history",
      },
      {
        title: t("app.layouts.dashboard.sidebarItems.finance.transactions"),
        icon: "ArrowLeftRight",
        to: "/dashboard/finance/transactions",
      },
    ],
  },
  {
    label: t("app.layouts.dashboard.sidebarItems.content.index"),
    items: [
      {
        title: t(
          "app.layouts.dashboard.sidebarItems.content.broadcastSoundbites",
        ),
        icon: "AppWindow",
        to: "/dashboard/content/broadcast-soundbites",
        disabled: !hasPermission(
          currentUser.value?.permission,
          PERMISSIONS.broadcaster,
        ),
      },
    ],
  },
  {
    label: t("app.layouts.dashboard.sidebarItems.broadcast.index"),
    items: [
      {
        title: t("app.layouts.dashboard.sidebarItems.broadcast.history"),
        icon: "History",
        to: "/dashboard/broadcast/history",
        disabled: !hasPermission(
          currentUser.value?.permission,
          PERMISSIONS.broadcaster,
        ),
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
    if (hasPermission(currentUser.value?.permission, PERMISSIONS.broadcaster)) {
      navigateTo("/applications/broadcaster");
    } else {
      navigateTo("/auth/login");
    }
  } else {
    isLoaded.value = true;
  }
});

useSeo({
  title: t("app.layouts.dashboard.title"),
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
            <SharedProfileSidebarDropdown variant="sidebar" />
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
                  {{ $t("app.layouts.dashboard.breadcrumb.homepage") }}
                </UiBreadcrumbLink>
              </UiBreadcrumbItem>
              <UiBreadcrumbSeparator />
              <UiBreadcrumbItem>
                <UiBreadcrumbLink to="/dashboard">
                  {{ $t("app.layouts.dashboard.breadcrumb.dashboard") }}
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
                    :to="`/dashboard/${route.path
                      .split('/')
                      .filter((v) => v.length)
                      .slice(1, index + 2)
                      .join('/')}`"
                  >
                    {{ $t(`app.layouts.dashboard.breadcrumb.${segment}`) }}
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
                    {{ $t(`app.layouts.dashboard.breadcrumb.${segment}`) }}
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
