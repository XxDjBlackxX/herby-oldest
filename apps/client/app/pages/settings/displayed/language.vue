<script lang="ts" setup>
const { t, locale, locales, setLocale } = useI18n();

const layout = reactive({
  title: t("app.pages.settings.displayed.language.title"),
});

const setI18n = (code: string) => {
  setLocale(code);
};

const currentLocale = computed(() => {
  return locales.value.find((l) => l.code == locale.value);
});

definePageMeta({
  middleware: "authentication",
});
</script>

<template>
  <NuxtLayout name="settings" v-bind="layout">
    <UiViewportCard v-for="(item, index) in locales" :key="index">
      <template #start>
        <NuxtImg :src="item.flag" class="w-7 h-7 object-cover rounded-full" />
        <h5 class="text-base font-medium text-black dark:text-zinc-100">
          {{ item.name }}
        </h5>
      </template>
      <template #end>
        <UiButton
          :disabled="currentLocale?.code == item.code"
          class="px-4 py-1.5"
          @click="setI18n(item.code)"
        >
          {{
            currentLocale?.code == item.code
              ? t("app.pages.settings.displayed.language.button.current")
              : t("app.pages.settings.displayed.language.button.change")
          }}
        </UiButton>
      </template>
    </UiViewportCard>
  </NuxtLayout>
</template>
