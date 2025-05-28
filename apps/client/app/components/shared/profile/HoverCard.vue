<script lang="ts" setup>
import type { User } from "@repo/client-types";

const isLoaded = ref(false);
const open = ref(false);
const profile = ref(null) as Ref<User | null>;

type ProfileHoverCardProps = {
  id: string;
};

const props = withDefaults(defineProps<ProfileHoverCardProps>(), {});

watch(open, async () => {
  if (isLoaded.value) return;
  const response = await getReq(`/users/${props.id}`).catch(() => {});
  profile.value = response.data.data;
  isLoaded.value = true;
});
</script>

<template>
  <UiHoverCard v-model:open="open">
    <UiHoverCardTrigger
      :href="`/u/${id}`"
      target="_blank"
      rel="noreferrer noopener"
      class="font-medium text-sm hover:underline"
    >
      <slot />
    </UiHoverCardTrigger>
    <UiHoverCardContent class="flex items-start gap-4 w-[200px] h-[74px]">
      <template v-if="isLoaded && profile">
        <UiImage
          shape="square"
          class="w-14 h-14"
          :src="profile.avatar.url"
          :alt="profile.username"
        >
          <template #fallback>{{ profile.avatar.fallback }}</template>
        </UiImage>
        <div class="flex flex-col h-full items-start justify-between">
          <h6 class="font-medium text-base capitalize">
            {{ profile.username }}
          </h6>
          <UiTypographyDesc
            >{{ $t("app.components.shared.profile.hoverCard.followers") }}
            <u>{{ profile.followerCount }}</u></UiTypographyDesc
          >
        </div>
      </template>
      <template v-else>
        <span class="flex items-center justify-center w-full h-full">
          <IconLoader :size="30" />
        </span>
      </template>
    </UiHoverCardContent>
  </UiHoverCard>
</template>
