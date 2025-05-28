<script lang="ts" setup>
import { ConfigProvider } from "reka-ui";

const { locale, locales } = useI18n();
const middlewareState = useMiddlewareState();
const textDirection = useTextDirection({ initialValue: "ltr" });

const dir = computed(() =>
  locales.value.find((l) => l.code == locale.value)?.dir == "rtl"
    ? "rtl"
    : "ltr",
);

watch(
  () => locale.value,
  (newLocale, oldLocale) => {
    if (newLocale !== oldLocale) {
      textDirection.value = dir.value;
    }
  },
  { immediate: true },
);

const isPageReady = computed(() => {
  return Object.values(middlewareState.value)
    .filter((state) => state.triggered)
    .every((state) => state.done && !state.err);
});
</script>

<template>
  <div vaul-drawer-wrapper>
    <NuxtLoadingIndicator color="#55f755" />
    <NuxtRouteAnnouncer />
    <UiToaster position="top-center" />
    <ConfigProvider :dir="dir">
      <NuxtPage v-if="isPageReady" />
      <template v-else>
        <UiPreloadPage />
      </template>
    </ConfigProvider>
  </div>
</template>
