<script lang="ts" setup>
const { sessionStore, runtimeConfig } = useImports();

const isScrollDown = ref(false);

const { y } = useWindowScroll();

watch(y, (v) => {
  isScrollDown.value = v > 30;
});
</script>

<template>
  <Teleport to="body">
    <header
      :data-scroll-down="isScrollDown"
      class="transition-all group fixed left-0 right-0 top-0 flex items-center justify-center w-full h-header z-50 data-[scroll-down=true]:bg-surface-100 data-[scroll-down=true]:shadow-lg"
    >
      <nav class="relative flex items-center justify-between gap-5 container">
        <ul>
          <li>
            <NuxtLink
              :to="runtimeConfig.app.CLIENT_URL"
              class="transition-all flex items-center justify-center hover:rotate-45"
            >
              <IconLogo :size="35" />
            </NuxtLink>
          </li>
          <li>
            <SharedToolsExtrasDropdown />
          </li>
        </ul>
        <ul
          class="transition-all hidden absolute top-0 left-0 sm:flex items-center justify-center w-full h-full pointer-events-none"
        >
          <li class="max-w-[300px] pointer-events-auto hidden sm:flex">
            <UiSearchBar
              size="sm"
              @search="(q) => navigateTo(`/soundbite/search/${q}`)"
            />
          </li>
        </ul>
        <ul>
          <li class="flex sm:hidden">
            <UiDrawer>
              <UiDrawerTrigger>
                <UiButton variant="ghost" class="p-2" as="span">
                  <IconMenu :size="20" />
                </UiButton>
              </UiDrawerTrigger>
              <UiDrawerContent>
                <UiSearchBar
                  size="sm"
                  @search="(q) => navigateTo(`/soundbite/search/${q}`)"
                />
              </UiDrawerContent>
            </UiDrawer>
          </li>
          <li v-if="sessionStore.isLoggedIn">
            <SharedProfileDropdown />
          </li>
          <li v-else>
            <UiMagicButton
              class="flex items-center gap-2 px-6 py-2.5 whitespace-nowrap"
              to="/auth/login"
            >
              <IconAudioWaveform :size="20" />
              {{ $t("app.components.common.header.end.login") }}
            </UiMagicButton>
          </li>
        </ul>
      </nav>
    </header>
  </Teleport>
</template>

<style scoped>
nav ul {
  display: flex;
  align-items: center;
  gap: 10px;
}

nav ul li {
  width: 100%;
}
</style>
