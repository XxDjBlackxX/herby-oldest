<script lang="ts" setup>
const { route } = useImports();

const type = route.params.type as string;
const types = ["discord", "github", "twitch", "kick"];

const { code, state } = route.query as { code?: string; state?: string };

const { data, pending } = await useAsyncData(
  `${type}Connection`,
  async () => {
    try {
      if (!code || !types.includes(type)) {
        navigateTo("/");
        return;
      }

      const { getItem, removeItem } = useLocalStorage();
      const response = await postReq(
        `/auth/connections/${type}?code=${code}&state=${state}`,
        {
          action: getItem("callback/action"),
        },
      );
      removeItem("callback/action");

      if (response.data.data?.isLoggedIn) {
        const session = useSession();
        session.login(response.data.data.access_token);
      }

      if (response.data.success) {
        window.location.href = "/settings/profile/connections";
      }

      return response.data;
    } catch {
      window.location.href = "/";
    }
  },
  { immediate: true },
);
</script>

<template>
  <NuxtLayout
    name="callback"
    :type="type"
    :loading="pending"
    :connected="!!data?.success"
  />
</template>
