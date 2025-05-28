<script lang="ts" setup>
import type { HTMLAttributes } from "vue";
import { hasPermission, type Permission } from "@repo/permission-utils";

interface Props {
  perms?: Permission | Permission[];
  class?: HTMLAttributes["class"];
  footer?: boolean;
  customSeo?: boolean;
}

const props = defineProps<Props>();
const { sessionStore, t } = useImports();

const isLoaded = ref(false);

if (!props.customSeo) {
  useSeo({
    title: t("common.meta.title"),
    description: t("common.meta.description"),
  });
}

onMounted(() => {
  if (
    props.perms &&
    !hasPermission(sessionStore._getUser?.permission, props.perms)
  ) {
    navigateTo("/auth/login");
  } else {
    isLoaded.value = true;
  }
});
</script>

<template>
  <div>
    <CommonHeader />
    <div class="container">
      <div v-if="isLoaded" :class="$cn('', props.class)">
        <slot />
      </div>
      <UiPreloadSubPage v-else class="mt-24" />
      <div v-if="footer" class="my-10">
        <CommonFooter />
      </div>
    </div>
  </div>
</template>
