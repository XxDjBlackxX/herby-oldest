<script lang="ts" setup>
import { PERMISSIONS } from "@repo/permission-utils";

const { sessionStore, validateAndUploadFile, t, toast } = useImports();
const { validationSchema, isSubmitting, handleSubmit, isFieldValid } =
  useValidationForm({
    layout: "user",
    options: [
      {
        message: t("app.pages.settings.profile.edit.input.username.message"),
        field: "username",
      },
      {
        message: t("app.pages.settings.profile.edit.input.description.message"),
        field: "description",
      },
    ],
  });

const currentUser = computed(() => sessionStore._getUser);

const waiting = reactive({
  uploadAvatar: false,
  uploadBanner: false,
});

const layout = reactive({
  perms: PERMISSIONS.user,
  title: t("app.pages.settings.profile.edit.title"),
});

const uploadAvatar = useThrottleFn(async (file: File | string | null) => {
  waiting.uploadAvatar = true;
  try {
    if (!sessionStore.user) return;
    const avatarURL = await validateAndUploadFile(file, {
      action: "upload",
      type: "png",
      childrens: ["avatars"],
    });
    if (!avatarURL) throw new Error();
    const response = await putReq("/users/me", { avatar: { url: avatarURL } });
    sessionStore.user.profile.avatar.url = response.data.data.avatar.url;
    toast.success(
      t("app.pages.settings.profile.edit.toast.success.uploadAvatar"),
    );
  } catch {
    toast.error(t("app.pages.settings.profile.edit.toast.error.uploadAvatar"));
  } finally {
    waiting.uploadAvatar = false;
  }
}, 10000);

const uploadBanner = useThrottleFn(async (file: File | string | null) => {
  waiting.uploadBanner = true;
  try {
    if (!sessionStore.user) return;
    const bannerURL = await validateAndUploadFile(file, {
      action: "upload",
      type: "png",
      childrens: ["banners"],
    });
    if (!bannerURL) throw new Error();
    const response = await putReq("/users/me", { banner: { url: bannerURL } });
    sessionStore.user.profile.banner.url = response.data.data.banner.url;
    toast.success(
      t("app.pages.settings.profile.edit.toast.success.uploadBanner"),
    );
  } catch {
    toast.error(t("app.pages.settings.profile.edit.toast.error.uploadBanner"));
  } finally {
    waiting.uploadBanner = false;
  }
}, 10000);

const onSubmit = handleSubmit(async (values) => {
  if (!currentUser.value) return;
  try {
    await putReq("/users/me", { description: values.description });
    toast.success(
      t("app.pages.settings.profile.edit.toast.success.updateInfo"),
    );
  } catch {
    toast.error(t("app.pages.settings.profile.edit.toast.error.updateInfo"));
  }
});

definePageMeta({
  middleware: "authentication",
});
</script>

<template>
  <NuxtLayout name="settings" v-bind="layout">
    <template v-if="currentUser">
      <UiFileUpload
        variant="card"
        :waiting="waiting.uploadAvatar"
        :defaultValue="currentUser.profile.avatar.url"
        @update:modelValue="uploadAvatar"
      >
        <template #title>
          {{ t("app.pages.settings.profile.edit.fileUpload.avatar.title") }}
        </template>
        <template #description>
          {{
            t("app.pages.settings.profile.edit.fileUpload.avatar.description")
          }}
        </template>
      </UiFileUpload>
      <UiFileUpload
        variant="card"
        :waiting="waiting.uploadBanner"
        :defaultValue="currentUser.profile.banner.url"
        @update:modelValue="uploadBanner"
      >
        <template #title>
          {{ t("app.pages.settings.profile.edit.fileUpload.banner.title") }}
        </template>
        <template #description>
          {{
            t("app.pages.settings.profile.edit.fileUpload.banner.description")
          }}
        </template></UiFileUpload
      >
      <UiSeparator />
      <form
        class="flex flex-col w-full gap-y-10"
        :validation-schema="validationSchema"
        @submit="onSubmit"
      >
        <UiFormField
          v-slot="{ componentField }"
          name="username"
          :modelValue="currentUser.username"
        >
          <UiFormItem>
            <UiFormLabel>
              {{ $t("app.pages.settings.profile.edit.input.username.label") }}
            </UiFormLabel>
            <UiFormControl>
              <UiInput disabled v-bind="componentField" />
            </UiFormControl>
            <UiFormMessage />
          </UiFormItem>
        </UiFormField>
        <UiFormField
          v-slot="{ componentField }"
          name="description"
          :modelValue="currentUser.profile.description"
        >
          <UiFormItem>
            <UiFormLabel>
              {{
                $t("app.pages.settings.profile.edit.input.description.label")
              }}
            </UiFormLabel>
            <UiFormControl>
              <UiTextarea class="max-h-[200px]" v-bind="componentField" />
            </UiFormControl>
            <UiFormMessage />
          </UiFormItem>
        </UiFormField>
        <UiButton
          type="submit"
          class="w-fit gap-x-3 px-3 py-2.5"
          :disabled="!isFieldValid('description')"
          :waiting="isSubmitting"
        >
          <IconSmile :size="20" />
          {{ t("app.pages.settings.profile.edit.button.updateInfo") }}
        </UiButton>
      </form>
    </template>
  </NuxtLayout>
</template>
