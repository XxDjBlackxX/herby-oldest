<script lang="ts" setup>
import type { Soundbite } from "@repo/client-types";

const props = defineProps({
  item: { type: Object as PropType<Soundbite>, required: true },
});

const { liking } = useSoundbite(props.item.id);
const { sessionStore, t, toast } = useImports();

const currentUser = sessionStore._getUser;

const isLiked = ref(props.item.requesting.isLiked);
const likeCount = ref(props.item.likeCount);

const onLiking = async () => {
  if (!currentUser?.id) return navigateTo("/auth/login");

  const data = await liking();
  toast.info(
    t(`app.components.soundbite.plugins.like.toast.${data.liked}`, {
      title: props.item.title,
    }),
  );
  likeCount.value = data.likeCount;
  isLiked.value = data.liked;
};
</script>

<template>
  <UiButton
    variant="ghost"
    class="flex items-center gap-2 px-2 py-0.5"
    @click="onLiking"
  >
    <IconHeart :class="isLiked ? 'text-red-500' : 'text-white'" :size="16" />
    {{ likeCount }}
  </UiButton>
</template>
