<script lang="ts" setup>
const { t } = useImports();
const { setTheme, theme, themes } = useTheme();

const layout = reactive({
  title: t("app.pages.settings.displayed.theme.title"),
});

definePageMeta({
  middleware: "authentication",
});
</script>

<template>
  <NuxtLayout name="settings" v-bind="layout">
    <div class="flex flex-row items-center justify-start gap-10">
      <button
        v-for="(item, index) in themes"
        :key="index"
        class="transition-all relative flex flex-col items-center gap-2 text-base font-medium text-typography-50"
        @click="setTheme(item.key)"
      >
        <div
          :class="
            $cn(
              'transition-all rounded-primary w-16 h-16 outline outline-2 outline-offset-2',
              item.key == theme ? 'outline-primary-500' : 'outline-surface-300',
            )
          "
          :style="{ backgroundColor: item.color, borderColor: item.color }"
        />
        <div
          :class="
            $cn(
              'transition-all absolute right-0 -m-1 flex items-center justify-center w-6 h-6 rounded-primary border-2 border-primary-600 bg-primary-500 text-primary-foreground',
              item.key == theme
                ? 'opacity-100 translate-y-0 translate-x-0'
                : 'opacity-0 -translate-y-4 translate-x-4',
            )
          "
        >
          <IconMousePointerClick />
        </div>
        <p class="max-w-16 text-center">
          {{ t(`app.pages.settings.displayed.theme.items.${item.key}`) }}
        </p>
      </button>
    </div>
    <div />
  </NuxtLayout>
</template>
