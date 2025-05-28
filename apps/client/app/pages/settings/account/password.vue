<script lang="ts" setup>
import { PERMISSIONS } from "@repo/permission-utils";

const { t, toast } = useImports();
const { current, goTo } = useStepper(["start", "token", "finish"]);
const {
  validationSchema,
  isSubmitting,
  handleSubmit,
  setValues,
  isFieldValid,
} = useValidationForm({
  layout: "user",
  options: [
    {
      message: t(
        "app.pages.settings.account.password.input.currentPassword.message",
      ),
      field: "currentPassword",
      children: "password",
    },
    {
      message: t(
        "app.pages.settings.account.password.input.newPassword.message",
      ),
      field: "newPassword",
      children: "password",
    },
    {
      message: t(
        "app.pages.settings.account.password.input.newPasswordRepeat.message",
      ),
      field: "newPasswordRepeat",
      children: "password",
    },
  ],
});

const isSuccess = ref(false);
const isWaiting = ref(false);
const layout = reactive({
  perms: PERMISSIONS.user,
  title: t("app.pages.settings.account.password.title"),
});

let payload: Record<string, string>;

const onSubmit = handleSubmit(async (values) => {
  try {
    await patchReq("/auth/account/password", values);
    payload = values;
    goTo("token");
    toast.success(t("app.pages.settings.account.password.toast.success"));
  } catch {
    toast.error(t("app.pages.settings.account.password.toast.error"));
  } finally {
    setValues({
      newPassword: "",
      newPasswordAgain: "",
    });
  }
});

async function handleToken(token: string) {
  isWaiting.value = true;
  try {
    await postReq("/auth/interaction-token/use", {
      token,
      interaction: "change_password",
    });
    isSuccess.value = true;
  } catch {
    isSuccess.value = false;
  } finally {
    goTo("finish");
    setTimeout(() => {
      goTo("start");
    }, 5000);
  }
}

definePageMeta({
  middleware: "authentication",
});
</script>

<template>
  <NuxtLayout name="settings" v-bind="layout">
    <form
      v-if="current == 'start'"
      class="flex flex-col w-full gap-y-10"
      :validation-schema="validationSchema"
      @submit="onSubmit"
    >
      <UiFormField v-slot="{ componentField }" name="currentPassword">
        <UiFormItem>
          <UiFormLabel>
            {{
              $t(
                "app.pages.settings.account.password.input.currentPassword.label",
              )
            }}
          </UiFormLabel>
          <UiFormControl>
            <UiInput type="password" v-bind="componentField" />
          </UiFormControl>
          <UiFormMessage />
        </UiFormItem>
      </UiFormField>
      <UiFormField v-slot="{ componentField }" name="newPassword">
        <UiFormItem>
          <UiFormLabel>
            {{
              $t("app.pages.settings.account.password.input.newPassword.label")
            }}
          </UiFormLabel>
          <UiFormControl>
            <UiInput type="password" v-bind="componentField" />
          </UiFormControl>
          <UiFormMessage />
        </UiFormItem>
      </UiFormField>
      <UiFormField v-slot="{ componentField }" name="newPasswordRepeat">
        <UiFormItem>
          <UiFormLabel>
            {{
              $t(
                "app.pages.settings.account.password.input.newPasswordRepeat.label",
              )
            }}
          </UiFormLabel>
          <UiFormControl>
            <UiInput type="password" v-bind="componentField" />
          </UiFormControl>
          <UiFormMessage />
        </UiFormItem>
      </UiFormField>
      <UiButton
        type="submit"
        class="w-fit gap-x-3 px-3 py-2.5"
        :disabled="
          !isFieldValid('currentPassword') &&
          !isFieldValid('newPassword') &&
          !isFieldValid('newPasswordRepeat')
        "
        :waiting="isSubmitting"
      >
        <IconSquareAsterisk :size="20" />
        {{ t("app.pages.settings.account.password.button.change") }}
      </UiButton>
    </form>
    <UiPinInput
      v-if="current == 'token'"
      :waiting="isWaiting"
      :repeat="5"
      @complate="handleToken"
    />
    <UiMessage
      :visible="current == 'finish'"
      :type="isSuccess ? 'success' : 'error'"
      >{{
        t(
          `app.pages.settings.account.password.message.${isSuccess ? "success" : "error"}`,
          { password: payload?.newPassword || "Noooo" },
        )
      }}</UiMessage
    >
  </NuxtLayout>
</template>
