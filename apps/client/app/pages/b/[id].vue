<script lang="ts" setup>
import type { ContentBroadcastSoundbite, User } from "@repo/client-types";
import { CONNECTION_LINKS } from "../../../constants/data";

const { route, toast, t, sessionStore } = useImports();

const currentUser = computed(() => {
  return sessionStore._getUser;
});

const { data: userData, pending } = await useAsyncData(
  `user-${route.params.id}`,
  async () => {
    const response = await getReq(
      `/users/${route.params.id}?fields=connections`,
    ).catch(() => {
      navigateTo("/");
    });

    const user = response.data.data as User;

    useSeo({
      title: user.username,
      description: user.description,
      image: user.avatar.url,
      type: "website",
    });

    return user;
  },
);

async function onPayment(soundbite: ContentBroadcastSoundbite) {
  try {
    if (!currentUser.value) return;
    const { trigger } = useBroadcast(route.params.id as string);
    await trigger({
      soundbite: soundbite.id,
      orbit: soundbite.orbit,
      action: "prod",
      target: "soundbite",
    });
    currentUser.value.payment.orbit.available =
      currentUser.value.payment.orbit.available - soundbite.orbit;
    toast.success(t("app.pages.b.toast.soundbite.success"));
  } catch {
    toast.error(t("app.pages.b.toast.soundbite.error"));
  }
}

const onFollow = useThrottleFn(async () => {
  if (!userData.value) return navigateTo("/auth/login");
  const { following } = useUser();

  const data = await following(route.params.id as string);
  userData.value.requesting.isFollowing = data.following;
  userData.value.followerCount = data.followerCount;

  toast.info(t(`app.pages.b..toast.follow.${data.following}`));
}, 5000);

definePageMeta({
  middleware: "authentication",
});
</script>

<template>
  <div
    class="relative flex items-center justify-center overflow-hidden h-screen max-h-screen"
  >
    <div
      v-if="!pending && userData"
      class="absolute inset-0"
      :style="{
        background: `url(${userData?.banner.url})`,
        backgroundPosition: 'top',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }"
      style="opacity: 0.1"
    ></div>

    <UiPreloadSubPage
      v-if="pending && !userData"
      class="w-full max-w-6xl px-5 h-[95vh] lg:h-[90vh]"
    />
    <div
      v-else-if="!pending && userData"
      class="w-full max-w-6xl px-5 h-[95vh] lg:h-[90vh]"
    >
      <UiScrollAreaRoot class="w-full h-full">
        <UiScrollAreaViewport
          class="p-5 lg:p-10 rounded-xl backdrop-blur-2xl w-full h-[95vh] lg:h-[90vh]"
        >
          <section class="flex items-center justify-start w-full mb-5">
            <UiButton variant="ghost" class="gap-2 p-2" to="/">
              <IconChevronLeft :size="20" />
              {{ $t("app.pages.b.button.homepage") }}
            </UiButton>
          </section>
          <div class="flex flex-col items-center gap-10 container">
            <section
              class="flex max-lg:flex-col items-center justify-between w-full gap-10"
            >
              <div
                class="flex max-sm:flex-col items-center sm:items-start w-full h-full gap-5"
              >
                <span class="relative group cursor-pointer">
                  <UiImage
                    :src="userData.avatar.url"
                    :alt="userData.username"
                    variant="hoverable"
                    inside-align="center"
                    class="w-32 h-32 border-2 border-surface-300"
                  >
                    <template #fallback>
                      {{ userData.avatar.fallback }}
                    </template>
                    <template #inside>
                      <p class="text-4xl font-bold text-white">
                        {{ userData.followerCount }}
                      </p>
                    </template>
                  </UiImage>
                </span>
                <UiSeparator
                  orientation="vertical"
                  class="h-[120px] hidden sm:block"
                />
                <div
                  class="flex flex-col items-center sm:items-start justify-around w-full sm:h-[120px] gap-3 sm:py-2"
                >
                  <h6
                    class="flex items-start gap-2 font-bold text-xl capitalize"
                  >
                    {{ userData.username }}
                    <button
                      v-if="userData.id !== sessionStore._getUser?.id"
                      type="button"
                      @click="onFollow"
                    >
                      <IconUserMinus
                        v-if="userData.requesting.isFollowing"
                        :size="16"
                      />
                      <IconUserPlus v-else :size="16" />
                    </button>
                  </h6>
                  <p
                    v-if="userData.description"
                    class="text-center font-light text-typography-500 text-sm"
                  >
                    {{ userData.description }}
                  </p>
                  <div
                    v-if="userData.connections.length"
                    class="flex items-center justify-center gap-2"
                  >
                    <a
                      v-for="(connection, index) in userData.connections"
                      :key="index"
                      :href="`${CONNECTION_LINKS[connection.type as 'discord']}${connection.username}`"
                    >
                      <UiBadge variant="secondary">
                        <Icon :name="connection.type" :size="18" />
                      </UiBadge>
                    </a>
                  </div>
                  <UiSeparator class="block sm:hidden" />
                </div>
              </div>
              <UiIntroductionCard>
                <template #icon>
                  <p class="font-bold text-3xl">
                    {{ currentUser?.payment?.orbit?.available || 0 }}
                  </p>
                </template>
                <template #title>
                  {{ $t("app.pages.b.orbitCard.title") }}
                </template>
                <template #button>
                  <UiButton to="/orbits" class="p-2">
                    {{ $t("app.pages.b.orbitCard.getOrbit") }}
                  </UiButton>
                </template>
              </UiIntroductionCard>
            </section>
            <UiSeparator />
            <UiSuperPaginatedItems
              :items-per-page="30"
              item-key="soundbites"
              :request="{
                url: `/users/${route.params.id}/content/soundbites/broadcast`,
              }"
              class="w-full grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-5"
            >
              <template #item="item">
                <UiCard>
                  <UiCardHeader>
                    <SoundbitePlayerCard :item="item" :plugins="[]" />
                  </UiCardHeader>
                  <UiCardContent>
                    <UiAlertDialog @action="onPayment(item)">
                      <template #title>
                        {{ $t("app.pages.b.dialog.soundbite.title") }}
                      </template>
                      <template #description>
                        {{
                          $t("app.pages.b.dialog.soundbite.description", {
                            orbit: item.orbit,
                          })
                        }}
                      </template>
                      <template #trigger>
                        <UiButton
                          as="span"
                          class="justify-center w-full py-2 gap-x-2"
                        >
                          <IconOrbit :size="16" />
                          {{ item.orbit }}
                        </UiButton>
                      </template>
                    </UiAlertDialog>
                  </UiCardContent>
                </UiCard>
              </template>
              <template #skeleton>
                <SoundbiteSkeletonPlayerCard />
              </template>
            </UiSuperPaginatedItems>
          </div>
        </UiScrollAreaViewport>
      </UiScrollAreaRoot>
    </div>
  </div>
</template>
