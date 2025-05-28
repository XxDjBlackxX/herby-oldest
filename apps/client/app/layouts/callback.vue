<script lang="ts" setup>
interface Props {
  type: string;
  connected: boolean;
  loading: boolean;
}

const props = withDefaults(defineProps<Props>(), { type: "X" });

const {
  t,
  runtimeConfig: { app },
} = useImports();

useSeo({
  title: t("app.layouts.callback.title", {
    title: props.type.toUpperCase(),
  }),
  description: t("app.layouts.callback.description", {
    title: props.type.toUpperCase(),
  }),
  image: "https://herby.cat/assets/favicon.ico",
  type: "website",
});
</script>

<template>
  <div
    class="transition-all flex flex-col items-center justify-center min-h-screen gap-10 bg-gradient-to-tr from-primary-500 from-10% via-transparent via-50% to-transparent to-90%"
  >
    <div class="flex items-center justify-between gap-5">
      <IconLogo :size="50" />
      <IconPlus :size="25" />
      <Icon :name="props.type" :size="50" />
    </div>

    <template v-if="loading">
      <section
        class="flex flex-col items-center justify-center text-center gap-2 p-5"
      >
        <p class="text-base font-medium">
          {{
            $t("app.layouts.callback.messages.loading", {
              type: type.toUpperCase(),
              title: app.TITLE,
            })
          }}
        </p>
        <IconLoader :size="20" />
      </section>
    </template>

    <template v-else-if="connected">
      <section
        class="flex flex-col items-center justify-center text-center gap-2 p-5"
      >
        <p class="text-base font-medium">
          {{
            $t("app.layouts.callback.messages.connected", {
              type: type.toUpperCase(),
              title: app.TITLE,
            })
          }}
        </p>
        <p class="text-base font-medium text-typography-500">
          {{
            $t("app.layouts.callback.submessages.connected", {
              title: app.TITLE,
            })
          }}
        </p>
      </section>
    </template>

    <template v-else>
      <section
        class="flex flex-col items-center justify-center text-center gap-2 p-5"
      >
        <p class="text-base font-medium text-red-500">
          {{
            $t("app.layouts.callback.messages.error.connected", {
              type: type.toUpperCase(),
              title: app.TITLE,
            })
          }}
        </p>
        <p class="text-base font-medium text-typography-500">
          {{ $t("app.layouts.callback.submessages.error.connected") }}
        </p>
      </section>
    </template>
  </div>
</template>
