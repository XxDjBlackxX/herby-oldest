<script lang="ts" setup>
import { PERMISSIONS } from "@repo/permission-utils";

const { sessionStore, t, toast } = useImports();

const currentUser = computed(() => {
  return sessionStore._getUser;
});

const orbits = ref();
const isWaiting = ref(false);

function onCreatePayment(item: any) {
  isWaiting.value = true;
  postReq("/payments", {
    basketItems: [
      {
        name: `${item.orbit} ${item.bonusOrbits ? `+ ${item.bonusOrbits}` : ""} Orbits`,
        price: item.totalPrice,
        type: "virtual",
        category: "root",
        subCategory: "orbits",
        event: {
          name: "purchaseOrbit",
          data: {
            orbit: item.totalOrbits,
          },
        },
      },
    ],
  })
    .then((response) => {
      toast.success(t("app.pages.orbits.toast.success"));
      navigateTo(`/payments/${response.data.data.id}`);
    })
    .catch(() => toast.error(t("app.pages.orbits.toast.error")))
    .finally(() => (isWaiting.value = false));
}

onMounted(() =>
  putReq(`/config/orbits`)
    .then((response) => (orbits.value = response.data.data.orbits))
    .catch(console.error),
);

useSeo({
  title: t("app.pages.orbits.meta.title"),
  description: t("app.pages.orbits.meta.description"),
});

definePageMeta({ middleware: "authentication" });
</script>

<template>
  <NuxtLayout
    name="app"
    footer
    custom-seo
    class="flex flex-col items-center gap-y-10 mt-24"
    :perms="PERMISSIONS.user"
  >
    <h1 class="font-bold text-3xl sm:text-5xl whitespace-nowrap">
      {{ $t("app.pages.orbits.title") }}
    </h1>
    <nav
      class="flex max-lg:flex-col items-start lg:items-center justify-between w-full gap-5"
    >
      <ul class="order-2 lg:order-1">
        <li>
          <UiTypographyDesc>
            {{ $t("app.pages.orbits.description") }}
          </UiTypographyDesc>
        </li>
      </ul>
      <ul class="order-1 lg:order-2">
        <li>
          <UiCard>
            <UiCardContent class="flex items-center gap-2">
              <IconOrbit :size="20" />
              <h4 class="text-lg font-bold">
                {{ currentUser?.payment?.orbit?.available || 0 }}
              </h4>
            </UiCardContent>
          </UiCard>
        </li>
      </ul>
    </nav>
    <UiSeparator />
    <div v-if="orbits" class="flex flex-col items-center w-full gap-10">
      <div
        v-for="(item, index) in orbits"
        :key="index"
        :data-popular="item.popular"
        class="relative group flex items-center justify-between p-5 w-full gap-5 h-[100px] bg-surface-100 rounded-primary border-2 border-dashed data-[popular=false]:border-surface-300 data-[popular=true]:border-primary-500 shadow-lg"
      >
        <div
          class="absolute -top-4 -right-4 bg-primary-500 text-primary-foreground p-2 rounded-primary border-2 border-dashed border-surface-300 group-data-[popular=false]:hidden"
        >
          <IconTag :size="20" />
        </div>
        <div class="flex items-center gap-4">
          <div class="flex flex-col items-start gap-3">
            <h1 class="font-bold text-2xl leading-6">
              {{ item.orbit }}
              {{ item.bonusOrbits ? `+ ${item.bonusOrbits}` : "" }} Orbits
            </h1>
            <UiSeparator />
            <div class="flex items-center gap-2">
              <IconOrbit
                v-for="i in item.totalOrbits.toString().length"
                :key="i"
                :aria-color="i"
                class="aria-[color=1]:text-typography-50 aria-[color=2]:text-purple-500 aria-[color=3]:text-blue-500 aria-[color=4]:text-red-500 aria-[color=5]:text-primary-500"
                :size="16"
              />
            </div>
          </div>
        </div>
        <UiAlertDialog
          :waiting="isWaiting"
          class="w-fit"
          @action="onCreatePayment(item)"
        >
          <template #title>
            {{ $t("app.pages.orbits.dialog.title") }}
          </template>
          <template #description>
            {{ $t("app.pages.orbits.dialog.description") }}
          </template>
          <template #trigger>
            <UiButton
              as="span"
              variant="secondary"
              class="flex justify-center w-20 py-3"
            >
              {{ item.totalPrice }} {{ currentUser?.payment?.currency?.symbol }}
            </UiButton>
          </template></UiAlertDialog
        >
      </div>
    </div>
  </NuxtLayout>
</template>
