<script lang="ts" setup>
import { PERMISSIONS } from "@repo/permission-utils";

const { sessionStore, runtimeConfig, t } = useImports();

const layout = reactive({
  perms: PERMISSIONS.user,
  title: t("app.pages.settings.profile.connections.title"),
});

const currentUser = computed(() => {
  return sessionStore._getUser;
});

const connections = reactive([
  {
    type: "discord",
    label: t("app.pages.settings.profile.connections.items.discord.label"),
    description: t(
      "app.pages.settings.profile.connections.items.discord.description",
    ),
    connected: false,
    waiting: false,
    icon: "Discord",
  },
  {
    type: "twitch",
    label: t("app.pages.settings.profile.connections.items.twitch.label"),
    description: t(
      "app.pages.settings.profile.connections.items.twitch.description",
    ),
    connected: false,
    waiting: false,
    icon: "Twitch",
  },
  {
    type: "github",
    label: t("app.pages.settings.profile.connections.items.github.label"),
    description: t(
      "app.pages.settings.profile.connections.items.github.description",
    ),
    connected: false,
    waiting: false,
    icon: "Github",
  },
  {
    type: "kick",
    label: t("app.pages.settings.profile.connections.items.kick.label"),
    description: t(
      "app.pages.settings.profile.connections.items.kick.description",
    ),
    connected: false,
    waiting: false,
    icon: "Kick",
  },
]);

const connect = async (type: string) => {
  const redirect_uri =
    runtimeConfig.public.REDIRECT_URI[type.toUpperCase() as "DISCORD"];
  const { setItem } = useLocalStorage();
  setItem("callback/action", "connect");
  window.location.href = redirect_uri;
};

const disconnect = async (type: string) => {
  const connection = connections.find((conn) => conn.type === type);
  if (!connection) return;

  connection.waiting = true;

  try {
    const response = await deleteReq(`/auth/connections/disconnect`, {
      params: { type },
    });

    if (response.data?.success) {
      connection.connected = false;
      connection.label = t(
        `app.pages.settings.profile.connections.items.${type.toLowerCase()}.label`,
      );
    }
  } catch (err) {
    console.error(err);
  } finally {
    connection.waiting = false;
  }
};

watch(
  () => currentUser.value?.connections,
  () => {
    for (const connec of currentUser.value?.connections || []) {
      const connection = connections.find((conn) => conn.type === connec.type);
      if (connection) {
        connection.label = connec.username;
        connection.connected = true;
      }
    }
  },
  { immediate: true },
);

definePageMeta({
  middleware: "authentication",
});
</script>

<template>
  <NuxtLayout name="settings" v-bind="layout">
    <UiViewportCard
      v-for="(connection, index) in connections"
      :key="index"
      :label="
        connection.type.charAt(0).toUpperCase() + connection.type.slice(1)
      "
      :sublabel="connection.description"
      :border="connections.length - 1 !== index"
      hypertext
    >
      <template #start>
        <Icon :name="connection.icon" :size="20" />
        <p class="font-medium text-sm sm:text-base">
          {{ connection.label }}
        </p>
      </template>
      <template #end>
        <UiButton
          class="px-5 py-1.5"
          :variant="connection.connected ? 'danger' : 'primary'"
          :waiting="connection.waiting"
          @click="
            connection.connected
              ? disconnect(connection.type)
              : connect(connection.type)
          "
        >
          {{
            t(
              `app.pages.settings.profile.connections.button.${connection.connected ? "disconnect" : "connect"}`,
            )
          }}
        </UiButton>
      </template>
    </UiViewportCard>
  </NuxtLayout>
</template>
