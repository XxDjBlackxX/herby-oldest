<script lang="ts" setup>
const { t, toast } = useImports();

const isWaiting = ref(false);

async function onCreate() {
  isWaiting.value = true;
  try {
    await postReq("/applications", { type: "broadcaster" });
    navigateTo("/settings/applications/view");
    toast.success(t("app.pages.applications.broadcaster.toast.success"));
  } catch {
    toast.error(t("app.pages.applications.broadcaster.toast.error"));
  } finally {
    isWaiting.value = false;
  }
}

definePageMeta({ middleware: "authentication" });
</script>

<template>
  <NuxtLayout name="app" class="mt-24" footer :scopes="['USER']">
    <UiCard class="w-full p-10">
      <UiCardContent class="flex flex-col gap-5">
        <fieldset class="flex flex-col gap-2">
          <UiTypographyTitle>
            {{ $t("app.pages.applications.broadcaster.title") }}
          </UiTypographyTitle>
          <UiTypographyDesc>
            {{ $t("app.pages.applications.broadcaster.description") }}
          </UiTypographyDesc>
        </fieldset>
        <UiCardSeparator />
        <div class="flex flex-col gap-2">
          <fieldset class="flex flex-col gap-1 mb-4">
            <UiCardTitle>{{
              $t("app.pages.applications.broadcaster.items.1.title")
            }}</UiCardTitle>
            <div class="flex items-start gap-x-2">
              <p class="hidden md:flex">-</p>
              <UiTypographyDesc>
                {{
                  $t("app.pages.applications.broadcaster.items.1.description")
                }}
              </UiTypographyDesc>
            </div>
          </fieldset>
          <fieldset class="flex flex-col gap-1 mb-4">
            <UiCardTitle>{{
              $t("app.pages.applications.broadcaster.items.2.title")
            }}</UiCardTitle>
            <div class="flex items-start gap-x-2">
              <p class="hidden md:flex">-</p>
              <UiTypographyDesc>
                {{
                  $t("app.pages.applications.broadcaster.items.2.description")
                }}
              </UiTypographyDesc>
            </div>
          </fieldset>
          <fieldset class="flex flex-col gap-1 mb-4">
            <UiCardTitle>{{
              $t("app.pages.applications.broadcaster.items.3.title")
            }}</UiCardTitle>
            <div class="flex items-start gap-x-2">
              <p class="hidden md:flex">-</p>
              <UiTypographyDesc>
                {{
                  $t("app.pages.applications.broadcaster.items.3.description")
                }}
              </UiTypographyDesc>
            </div>
          </fieldset>
        </div>
        <UiCardSeparator />
        <UiTypographyDesc>
          {{ $t("app.pages.applications.broadcaster.subDescription") }}
        </UiTypographyDesc>
        <UiCardSeparator />
        <footer class="flex items-center justify-end w-full">
          <UiButton class="px-4 py-3" :waiting="isWaiting" @click="onCreate">
            {{ $t("app.pages.applications.broadcaster.button") }}
          </UiButton>
        </footer>
      </UiCardContent>
    </UiCard>
  </NuxtLayout>
</template>
