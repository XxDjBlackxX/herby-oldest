<script lang="ts" setup>
import { Footprints } from "lucide-vue-next";

const { runtimeConfig } = useImports();

interface Props {
  label: string;
  sublabel: string;
  footer?: {
    paragraph: string;
    button: { to: string; text: string };
  };
  timeline?: string[];
  loaded?: boolean;
  loginWith?: boolean;
}

interface With {
  name: "discord" | "kick";
  uri: string;
}

const withs: With[] = [
  {
    name: "discord",
    uri: runtimeConfig.public.REDIRECT_URI.DISCORD,
  },
  {
    name: "kick",
    uri: runtimeConfig.public.REDIRECT_URI.KICK,
  },
];

const footerRef = ref<HTMLElement>();

async function onLoginWith(i: With) {
  const { setItem } = useLocalStorage();
  setItem("callback/action", "oauth");
  window.location.href = i.uri;
}

const props = withDefaults(defineProps<Props>(), { loaded: true });

useSeo({
  title: props.label,
  description: props.sublabel,
  image: "https://herby.cat/assets/favicon.ico",
  type: "website",
});
</script>

<template>
  <span>
    <div
      class="fixed top-0 left-0 m-[22px] lg:m-10 z-50 backdrop-blur-sm rounded-primary p-2"
    >
      <UiSwitchingBetweenPagesButton />
    </div>
    <article
      class="flex flex-col items-center justify-center w-full min-h-screen my-10"
    >
      <div
        v-if="props.footer"
        class="fixed flex items-center justify-center bottom-0 m-5 z-50"
      >
        <UiButton
          :to="props.footer.button.to"
          class="whitespace-nowrap flex items-center gap-x-2 py-2 px-4"
          variant="secondary"
        >
          {{ props.footer.button.text }}
          <IconSquareArrowOutUpRight :size="18" />
        </UiButton>
      </div>
      <div
        class="container flex flex-col items-start gap-5 w-full max-w-[500px]"
      >
        <div class="flex flex-col items-start gap-1">
          <UiTypographyTitle> {{ label }}</UiTypographyTitle>
          <UiTypographyDesc> {{ sublabel }}</UiTypographyDesc>
        </div>
        <UiTimeline
          v-if="props.timeline"
          class="mt-5"
          :values="
            props.timeline.map((v) => ({
              name: v as string,
              icon: Footprints,
            }))
          "
        />
        <div v-if="loginWith" class="flex flex-col gap-5 items-center w-full">
          <UiTooltipProvider>
            <UiTooltip v-for="(i, index) in withs" :key="index">
              <UiTooltipTrigger class="w-full" as-child>
                <button
                  type="button"
                  :class="
                    $cn(
                      'transition-all flex items-center justify-center gap-4 font-medium text-base w-full border-2 border-dashed p-2 rounded-primary capitalize',
                      {
                        'bg-blue-600 hover:bg-blue-500 border-blue-400':
                          i.name == 'discord',
                        'bg-green-600 hover:bg-green-500 border-green-400':
                          i.name == 'kick',
                      },
                    )
                  "
                  @click="onLoginWith(i)"
                >
                  <Icon :name="i.name" :size="30" />
                  {{ $t("app.layouts.auth.loginWith", { company: i.name }) }}
                </button>
              </UiTooltipTrigger>
              <UiTooltipContent side="bottom" align="center">
                <UiTypographyDesc class="capitalize">{{
                  i.name
                }}</UiTypographyDesc>
              </UiTooltipContent>
            </UiTooltip>
          </UiTooltipProvider>
        </div>
        <section class="flex flex-col items-start justify-center w-full gap-5">
          <template v-if="loaded">
            <slot />
          </template>
          <template v-else>
            <UiSkeletonInput v-for="i in 2" :key="i" />
          </template>
        </section>
      </div>
      <UiButton
        variant="ghost"
        class="flex items-center gap-2 p-2 mt-5"
        @click="useScrollTo(footerRef as HTMLElement)"
      >
        {{ $t("app.layouts.auth.other") }}
        <IconArrowDown :size="16" />
      </UiButton>
    </article>
    <div ref="footerRef" class="flex flex-col gap-y-10 container mb-10">
      <PageCardAuthForgotPassword />
      <PageCardAuthLogin />
      <PageCardAuthRegister />
      <CommonFooter />
    </div>
  </span>
</template>
