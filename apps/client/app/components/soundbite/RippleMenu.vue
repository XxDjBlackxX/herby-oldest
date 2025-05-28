<script lang="ts" setup>
import { PERMISSIONS, hasPermission } from "@repo/permission-utils";
import type { Soundbite, ContentBroadcastSoundbite } from "@repo/client-types";

const props = defineProps({
  item: {
    type: Object as PropType<Soundbite | ContentBroadcastSoundbite>,
    required: true,
  },
});

const { del } = useSoundbite(props.item.id);
const { sessionStore, t, toast } = useImports();

const currentUser = computed(() => sessionStore._getUser);

const requesting = reactive({
  isBroadcast: props.item.requesting.isBroadcast,
  owner: props.item.requesting.owner,
});

const onBroadcast = useThrottleFn(async () => {
  if (!currentUser.value?.id) return;

  const response = await postReq(
    `/users/content/manage/soundbites/${props.item.id}/broadcast`,
  );

  requesting.isBroadcast = response.data.data;

  toast.success(
    t(
      `app.components.soundbite.rippleMenu.toast.broadcast.index.${requesting.isBroadcast ? "add" : "remove"}`,
      {
        name: props.item.title,
      },
    ),
  );
}, 300);

const onDelete = useThrottleFn(async () => {
  if (!currentUser.value?.id) return;

  try {
    await del();
    toast.success(
      t("app.components.soundbite.rippleMenu.toast.settings.delete.success"),
    );
  } catch {
    toast.error(
      t("app.components.soundbite.rippleMenu.toast.settings.delete.error"),
    );
  }
}, 300);

const onTest = useThrottleFn(async () => {
  if (!currentUser.value?.id) return;
  const { trigger } = useBroadcast(currentUser.value.id);

  try {
    await trigger({
      soundbite: props.item.id,
      action: "test",
      target: "soundbite",
    });
    toast.success(
      t("app.components.soundbite.rippleMenu.toast.broadcast.test.success"),
    );
  } catch {
    toast.error(
      t("app.components.soundbite.rippleMenu.toast.broadcast.test.error"),
    );
  }
}, 300);
</script>

<template>
  <UiDropdownMenu>
    <UiDropdownMenuTrigger class="h-fit">
      <UiButton as="span" variant="ghost" class="p-2"
        ><IconMoreHorizontal :size="20"
      /></UiButton>
    </UiDropdownMenuTrigger>
    <UiDropdownMenuContent align="end" side="bottom" class="space-y-1">
      <UiDropdownMenuItem :to="`/soundbite/${item.id}`">
        <IconSquareArrowOutUpRight :size="16" />
        {{ $t("app.components.soundbite.rippleMenu.index.openWeb") }}
      </UiDropdownMenuItem>
      <template
        v-if="hasPermission(currentUser?.permission, PERMISSIONS.broadcaster)"
      >
        <UiSeparator />
        <UiAlertDialog @action="onBroadcast">
          <template #title>
            {{
              $t(
                `app.components.soundbite.rippleMenu.broadcast.${requesting.isBroadcast ? "remove" : "add"}.dialog.title`,
              )
            }}
          </template>
          <template #description>
            {{
              $t(
                `app.components.soundbite.rippleMenu.broadcast.${requesting.isBroadcast ? "remove" : "add"}.dialog.description`,
              )
            }}
          </template>
          <template #trigger>
            <UiDropdownMenuItem as="span">
              <IconTvMinimal :size="16" />
              {{
                $t(
                  `app.components.soundbite.rippleMenu.broadcast.${requesting.isBroadcast ? "remove" : "add"}.button`,
                )
              }}
            </UiDropdownMenuItem>
          </template>
        </UiAlertDialog>
        <UiAlertDialog v-if="requesting.isBroadcast" @action="onTest">
          <template #title>
            {{
              $t(
                "app.components.soundbite.rippleMenu.broadcast.test.dialog.title",
              )
            }}
          </template>
          <template #description>
            {{
              $t(
                "app.components.soundbite.rippleMenu.broadcast.test.dialog.description",
              )
            }}
          </template>
          <template #trigger>
            <UiDropdownMenuItem as="span">
              <IconFlaskRound :size="16" />
              {{
                $t("app.components.soundbite.rippleMenu.broadcast.test.button")
              }}
            </UiDropdownMenuItem>
          </template>
        </UiAlertDialog>
      </template>
      <template v-else>
        <UiSeparator />
        <UiDropdownMenuItem to="/applications/broadcaster">
          <IconTvMinimal :size="16" />
          {{ $t("app.components.soundbite.rippleMenu.broadcast.become") }}
        </UiDropdownMenuItem>
      </template>
      <template v-if="requesting.owner">
        <UiDropdownMenuSeparator />
        <UiAlertDialog @action="onDelete">
          <template #title>
            {{
              $t(
                "app.components.soundbite.rippleMenu.settings.delete.dialog.title",
              )
            }}
          </template>
          <template #description>
            {{
              $t(
                "app.components.soundbite.rippleMenu.settings.delete.dialog.description",
              )
            }}
          </template>
          <template #trigger>
            <UiDropdownMenuItem as="span" variant="danger">
              <IconTrash2 :size="16" />
              {{
                $t("app.components.soundbite.rippleMenu.settings.delete.button")
              }}
            </UiDropdownMenuItem>
          </template>
        </UiAlertDialog>
      </template>
    </UiDropdownMenuContent>
  </UiDropdownMenu>
</template>
