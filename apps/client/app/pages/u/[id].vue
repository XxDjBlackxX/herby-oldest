<script lang="ts" setup>
import { getPermissions } from "@repo/permission-utils";
import type { User } from "@repo/client-types";
import { CONNECTION_LINKS } from "../../../constants/data";

const { route, toast, t, sessionStore } = useImports();

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

const onFollow = useThrottleFn(async () => {
  if (!userData.value) return navigateTo("/auth/login");
  const { following } = useUser();

  const data = await following(route.params.id as string);
  userData.value.requesting.isFollowing = data.following;
  userData.value.followerCount = data.followerCount;

  toast.info(t(`app.pages.u.toast.follow.${data.following}`));
}, 5000);

definePageMeta({
  middleware: "authentication",
});
</script>

<template>
  <span>
    <CommonHeader />
    <div class="container mt-24 mb-10">
      <template v-if="!pending && userData">
        <div class="flex max-md:flex-col items-start gap-5">
          <UiCard substratum class="w-full md:max-w-[250px] min-h-[250px]">
            <UiCardHeader class="flex flex-col items-center w-full gap-2">
              <UiImage
                :src="userData.avatar.url"
                :alt="userData.username"
                shape="square"
                class="w-32 h-32 border-2 border-surface-300"
              >
                <template #fallback>
                  {{ userData.avatar.fallback }}
                </template>
              </UiImage>
              <h6 class="flex items-start gap-2 font-medium text-lg capitalize">
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
            </UiCardHeader>
            <UiCardContent class="flex flex-col items-center mt-5 gap-y-5">
              <UiSeparator />
              <div
                class="flex flex-wrap items-center justify-center w-full md:max-w-[250px] gap-2"
              >
                <UiTooltipProvider>
                  <UiTooltip
                    v-for="(item, index) in getPermissions(userData.permission)"
                    :key="index"
                  >
                    <UiTooltipTrigger>
                      <UiBadge :variant="item" />
                    </UiTooltipTrigger>
                    <UiTooltipContent>
                      {{ $t(`app.pages.u.information.badges.${item}`) }}
                    </UiTooltipContent>
                  </UiTooltip>
                </UiTooltipProvider>
              </div>
              <UiSeparator />
              <template v-if="userData.description">
                <UiTypographyDesc class="text-center">
                  {{ userData.description }}
                </UiTypographyDesc>
                <UiSeparator />
              </template>
              <!-- User Followers -->
              <div
                class="flex flex-wrap items-center justify-center w-full gap-10"
              >
                <span class="flex flex-col items-center">
                  <h4 class="text-sm font-bold underline text-typography-500">
                    {{ $t("app.pages.u.information.followers") }}
                  </h4>
                  <p class="text-xl font-bold">
                    {{ userData.followerCount }}
                  </p>
                </span>
              </div>
            </UiCardContent>
          </UiCard>
          <div class="flex flex-col items-center w-full gap-10 md:mb-44">
            <span class="w-full hidden md:flex">
              <UiImage :src="userData.banner.url" width="100%" :height="150" />
            </span>
            <UiTabs default-value="liked">
              <UiTabsList>
                <UiTabsTrigger value="liked">
                  {{ $t("app.pages.u.tabs.liked") }}
                </UiTabsTrigger>
                <UiTabsTrigger value="created">
                  {{ $t("app.pages.u.tabs.created") }}
                </UiTabsTrigger>
              </UiTabsList>
              <UiTabsContent value="liked">
                <UiSuperPaginatedItems
                  :items-per-page="52"
                  item-key="soundbites"
                  :request="{
                    url: `/users/${route.params.id}/content/soundbites/liked`,
                  }"
                  class="w-full grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-5"
                >
                  <template #item="item">
                    <SoundbitePlayerCard
                      :item="item"
                      :plugins="['like', 'author']"
                    />
                  </template>
                  <template #skeleton>
                    <SoundbiteSkeletonPlayerCard />
                  </template>
                </UiSuperPaginatedItems>
              </UiTabsContent>
              <UiTabsContent value="created">
                <UiSuperPaginatedItems
                  :items-per-page="52"
                  item-key="soundbites"
                  :request="{
                    url: `/users/${route.params.id}/content/soundbites/created`,
                  }"
                  class="w-full grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-5"
                >
                  <template #item="item">
                    <SoundbitePlayerCard :item="item" :plugins="['like']" />
                  </template>
                  <template #skeleton>
                    <SoundbiteSkeletonPlayerCard />
                  </template>
                </UiSuperPaginatedItems>
              </UiTabsContent>
            </UiTabs>
          </div>
        </div>
      </template>
      <template v-else>
        <div class="flex max-md:flex-col items-start gap-5">
          <UiSkeleton class="w-full md:max-w-[250px] h-[300px]" />
          <UiSkeleton class="hidden md:flex w-full h-[130px]" />
        </div>
      </template>
      <div class="space-y-10 mt-10">
        <UiSeparator />
        <PageCardCreateSoundbite />
      </div>
    </div>
    <div class="container my-10">
      <CommonFooter />
    </div>
  </span>
</template>
