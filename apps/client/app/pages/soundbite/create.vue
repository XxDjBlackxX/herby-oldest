<script lang="ts" setup>
import { useStepper } from "@vueuse/core";
import { PERMISSIONS } from "@repo/permission-utils";

const { goToPrevious, current, goTo, goToNext } = useStepper([
  "upload-file",
  "edit-file",
  "edit-options",
]);
const { sessionStore, validateAndUploadFile, t, toast } = useImports();

const VISIBILITIES = [
  {
    name: t("app.pages.soundbite.create.options.visibility.items.public"),
    value: "public",
  },
  {
    name: t("app.pages.soundbite.create.options.visibility.items.private"),
    value: "private",
  },
];

const currentUser = computed(() => {
  return sessionStore._getUser;
});

const isWaiting = ref(false);
const spacing = ref([0, 10] as [number, number]);

const state = reactive({
  audio: null as null | File,
  thumbnail: null as null | File,
  tags: [],
  title: "",
  visibility: "",
});

async function onNext() {
  isWaiting.value = true;
  try {
    if (current.value === "edit-options") {
      await postReq("/soundbites", state);
      toast.success(t("app.pages.soundbite.create.toast.success"));
      navigateTo(`/u/${currentUser.value?.username}`);
    }
    if (current.value == "edit-file") {
      const audio = await validateAndUploadFile(state.audio, {
        startTime: spacing.value[0].toString(),
        duration: spacing.value[1].toString(),
        type: "mp3",
        action: "trim-and-upload",
        childrens: ["soundbites", "audio"],
      });
      state.audio = audio;
    }
  } catch {
    toast.error(t("app.pages.soundbite.create.toast.error"));
    if (current.value == "edit-file") {
      setTimeout(() => {
        goTo("upload-file");
        Object.assign(state, {
          audio: null,
          thumbnail: null,
          tags: [],
          title: "",
          visibility: "",
        });
      }, 5000);
    }
  } finally {
    goToNext();
    isWaiting.value = false;
  }
}

async function uploadThumbnail(file: any) {
  isWaiting.value = true;
  try {
    const thumbnail = await validateAndUploadFile(file, {
      type: "webp",
      action: "upload",
      childrens: ["soundbites", "thumbnail"],
    });
    state.thumbnail = thumbnail;
  } catch {
    toast.error(t("app.pages.soundbite.create.toast.error"));
    state.thumbnail = null;
  } finally {
    isWaiting.value = false;
  }
}

function uploadAudio(file: any) {
  if (!file) {
    state.audio = null;
    goTo("upload-file");
    return;
  }
  state.audio = file;
  goTo("edit-file");
}

useSeo({
  title: t("app.pages.soundbite.create.meta.title"),
  description: t("app.pages.soundbite.create.meta.description"),
});

definePageMeta({ middleware: "authentication" });
</script>

<template>
  <NuxtLayout
    name="app"
    class="flex items-center justify-center my-24 md:my-40"
    footer
    custom-seo
    :perms="PERMISSIONS.user"
  >
    <div
      class="flex flex-col items-center gap-10 mx-auto rounded-primary w-full max-w-xl"
    >
      <!-- Top Menu -->
      <div class="flex flex-col items-center w-full gap-5">
        <UiTypographyTitle class="text-center">
          {{ $t("app.pages.soundbite.create.title") }}</UiTypographyTitle
        >
        <UiTypographyDesc class="text-center">
          {{ $t("app.pages.soundbite.create.description") }}
        </UiTypographyDesc>
      </div>
      <UiSeparator />
      <!-- Upload File Timeline  -->
      <template v-if="current == 'upload-file'">
        <UiFileUpload
          accept="audio/*,video/*"
          height="200px"
          width="100%"
          @update:modelValue="uploadAudio"
        >
          <template #title>{{
            $t("app.pages.soundbite.create.options.uploadAudio.title")
          }}</template>
          <template #description>{{
            $t("app.pages.soundbite.create.options.uploadAudio.description")
          }}</template>
        </UiFileUpload>
        <UiSeparator label="Downloader" />
        <SharedToolsDownloaderLinks />
      </template>
      <!-- Edit File Timeline -->
      <template v-else-if="current == 'edit-file'">
        <UiFileEditor
          v-model:spacing="spacing"
          :file="state.audio"
          :min-spacing="1"
          :max-spacing="20"
        />
      </template>
      <!-- Edit Options Timeline -->
      <template v-else-if="current == 'edit-options'">
        <div class="flex flex-col items-center justify-between w-full gap-5">
          <UiFileUpload
            accept="image/*"
            forming
            :height="200"
            :width="200"
            :modelValue="state.thumbnail"
            @update:model-value="uploadThumbnail"
          >
            <template #title>{{
              $t("app.pages.soundbite.create.options.uploadThumbnail.title")
            }}</template>
            <template #description>{{
              $t(
                "app.pages.soundbite.create.options.uploadThumbnail.description",
              )
            }}</template>
          </UiFileUpload>
          <UiItemField>
            <template #label>{{
              $t("app.pages.soundbite.create.options.title.label")
            }}</template>
            <template #item>
              <UiInput
                v-model="state.title"
                :placeholder="
                  $t('app.pages.soundbite.create.options.title.placeholder')
                "
                size="sm"
              />
            </template>
          </UiItemField>
          <UiItemField>
            <template #label>{{
              $t("app.pages.soundbite.create.options.visibility.label")
            }}</template>
            <template #item>
              <UiSelect v-model="state.visibility">
                <UiSelectTrigger size="sm">
                  <UiSelectValue
                    :placeholder="
                      $t(
                        'app.pages.soundbite.create.options.visibility.placeholder',
                      )
                    "
                  />
                </UiSelectTrigger>
                <UiSelectContent :side-offset="5">
                  <UiSelectGroup>
                    <UiSelectItem
                      v-for="(item, index) in VISIBILITIES"
                      :key="index"
                      :value="item.value"
                    >
                      {{ item.name }}
                    </UiSelectItem>
                  </UiSelectGroup>
                </UiSelectContent>
              </UiSelect>
            </template>
          </UiItemField>
          <UiItemField>
            <template #label>{{
              $t("app.pages.soundbite.create.options.tags.label")
            }}</template>
            <template #item>
              <UiTagsInput
                v-model="state.tags"
                :placeholder="
                  $t('app.pages.soundbite.create.options.tags.placeholder')
                "
              />
            </template>
          </UiItemField>
        </div>
      </template>
      <!-- Bottom Menu -->
      <template v-if="current !== 'upload-file'">
        <UiSeparator />
        <div class="flex items-center justify-between w-full">
          <UiButton
            variant="secondary"
            :disabled="isWaiting"
            class="p-2"
            @click="goToPrevious"
          >
            {{ $t("common.prev") }}
          </UiButton>
          <UiButton class="px-4 py-2" :waiting="isWaiting" @click="onNext">
            {{ $t("common.submit") }}
          </UiButton>
        </div>
      </template>
    </div>
  </NuxtLayout>
</template>
