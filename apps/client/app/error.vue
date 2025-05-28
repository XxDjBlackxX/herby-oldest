<template>
  <div class="flex flex-col items-center justify-center w-full h-screen gap-5">
    <UiTypographyTitle> {{ $t("common.error.page.title") }}</UiTypographyTitle>
    <UiButton class="px-2 py-3" variant="secondary" @click="goHomePage">
      {{ $t("common.error.page.button") }}
    </UiButton>
  </div>
</template>

<script lang="ts" setup>
function goHomePage() {
  window.location.href = "/";
}
</script>
