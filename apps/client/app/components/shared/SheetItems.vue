<script lang="ts" setup>
import {
  PERMISSIONS,
  hasPermission,
  type Permission,
} from "@repo/permission-utils";

const { t, sessionStore } = useImports();

const props = defineProps({
  data: {
    type: String as PropType<"settings">,
    default: "settings",
  },
});

const currentUser = computed(() => {
  return sessionStore._getUser;
});

const items = ref(
  [] as Array<{
    name: string;
    perm?: Permission;
    subItems: Array<{
      name: string;
      to: string;
      icon: string;
    }>;
  }>,
);

const filteredItems = computed(() => {
  return items.value.filter((cat) =>
    cat.perm ? hasPermission(currentUser.value?.permission, cat.perm) : true,
  );
});

onMounted(() => {
  if (props.data == "settings") {
    items.value = [
      {
        name: t("app.components.shared.sheetItems.settings.profile.index"),
        perm: PERMISSIONS.user,
        subItems: [
          {
            name: t("app.components.shared.sheetItems.settings.profile.edit"),
            to: "/settings/profile/edit",
            icon: "Settings2",
          },
          {
            name: t(
              "app.components.shared.sheetItems.settings.profile.connections",
            ),
            to: "/settings/profile/connections",
            icon: "Unplug",
          },
        ],
      },
      {
        name: t("app.components.shared.sheetItems.settings.account.index"),
        perm: PERMISSIONS.user,
        subItems: [
          {
            name: t(
              "app.components.shared.sheetItems.settings.account.password",
            ),
            to: "/settings/account/password",
            icon: "KeyRound",
          },
          {
            name: t("app.components.shared.sheetItems.settings.account.email"),
            to: "/settings/account/email",
            icon: "Mail",
          },
        ],
      },
      {
        name: t("app.components.shared.sheetItems.settings.applications.index"),
        perm: PERMISSIONS.user,
        subItems: [
          {
            name: t(
              "app.components.shared.sheetItems.settings.applications.view",
            ),
            to: "/settings/applications/view",
            icon: "Archive",
          },
          {
            name: t(
              "app.components.shared.sheetItems.settings.applications.create",
            ),
            to: "/settings/applications/create",
            icon: "SquarePen",
          },
        ],
      },
      {
        name: t("app.components.shared.sheetItems.settings.displayed.index"),
        subItems: [
          {
            name: t(
              "app.components.shared.sheetItems.settings.displayed.language",
            ),
            to: "/settings/displayed/language",
            icon: "Languages",
          },
          {
            name: t(
              "app.components.shared.sheetItems.settings.displayed.theme",
            ),
            to: "/settings/displayed/theme",
            icon: "Palette",
          },
        ],
      },
      {
        name: t("app.components.shared.sheetItems.settings.auth.index"),
        perm: PERMISSIONS.user,
        subItems: [
          {
            name: t(
              "app.components.shared.sheetItems.settings.auth.protection",
            ),
            to: "/settings/auth/protection",
            icon: "Key",
          },
        ],
      },
    ];
  }
});
</script>

<template>
  <div
    v-for="(item, index) in filteredItems"
    :key="item.name"
    :class="$cn('w-full', index < filteredItems.length - 1 ? 'mb-5' : '')"
  >
    <h2
      class="transition-all mb-4 whitespace-nowrap text-sm font-medium text-typography-500"
    >
      {{ item.name }}
    </h2>
    <div
      :class="
        $cn(
          'flex flex-col items-start gap-2 w-full',
          items.length !== index + 1 ? 'mb-5' : '',
        )
      "
    >
      <UiSheetItem
        v-for="subItem in item.subItems"
        :key="subItem.name"
        :to="subItem.to"
      >
        <Icon :name="subItem.icon" :size="16" />
        {{ subItem.name }}
      </UiSheetItem>
    </div>
    <UiSeparator v-if="index < filteredItems.length - 1" />
  </div>
</template>
