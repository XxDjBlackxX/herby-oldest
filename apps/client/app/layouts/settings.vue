<script lang="ts" setup>
import { hasPermission, type Permission } from "@repo/permission-utils";

interface Props {
  title: string;
  perms?: Permission | Permission[];
}

const props = defineProps<Props>();
const { sessionStore, t } = useImports();
const currentUser = computed(() => sessionStore._getUser);
const isLoaded = ref(false);

onMounted(() => {
  if (
    props.perms &&
    !hasPermission(currentUser.value?.permission, props.perms)
  ) {
    navigateTo("/settings/displayed/theme");
  } else {
    isLoaded.value = true;
  }
});

useSeo({
  title: `${t("app.layouts.settings")} • ${props.title}`,
});
</script>

<template>
  <span>
    <CommonHeader />
    <div v-if="isLoaded" class="space-y-10 container mt-24 mb-10">
      <PageCardDashboard />
      <UiSeparator />
      <div class="flex items-start justify-between mb-28">
        <div class="hidden lg:block w-full max-w-[25%]">
          <SharedSheetItems data="settings" />
        </div>
        <div class="flex flex-col items-start gap-10 w-full lg:max-w-[72%]">
          <h6
            class="flex items-center gap-2 whitespace-nowrap font-bold text-lg"
          >
            {{ title }}
            <UiSheet>
              <UiSheetTrigger class="lg:hidden">
                <IconMenu :size="18" />
              </UiSheetTrigger>
              <UiSheetContent side="left">
                <UiSheetHeader>
                  <template #title>
                    {{ $t("app.layouts.settings") }}
                  </template>
                </UiSheetHeader>
                <SharedSheetItems data="settings" />
              </UiSheetContent>
            </UiSheet>
          </h6>
          <slot />
        </div>
      </div>
      <UiSeparator />
      <CommonFooter />
    </div>
    <UiPreloadSubPage v-else class="mt-24" />
  </span>
</template>
