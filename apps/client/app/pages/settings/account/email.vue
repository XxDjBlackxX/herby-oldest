<script lang="ts" setup>
import { PERMISSIONS } from "@repo/permission-utils";

const { current, goTo } = useStepper(["start", "token", "finish"]);
const { sessionStore, t, toast } = useImports();

const isSuccess = ref(false);
const isWaiting = ref(false);
const currentUser = computed(() => {
  return sessionStore._getUser;
});

const {
  validationSchema,
  isSubmitting,
  setValues,
  handleSubmit,
  isFieldValid,
} = useValidationForm({
  layout: "user",
  options: [
    {
      message: t("app.pages.settings.account.email.input.currentEmail.message"),
      field: "currentEmail",
      children: "email",
    },
    {
      message: t("app.pages.settings.account.email.input.newEmail.message"),
      field: "newEmail",
      children: "email",
    },
    {
      message: t(
        "app.pages.settings.account.email.input.newEmailRepeat.message",
      ),
      field: "newEmailRepeat",
      children: "email",
    },
  ],
  initialValues: {
    currentEmail: currentUser.value?.identity?.email,
  },
});

const layout = reactive({
  perms: PERMISSIONS.user,
  title: t("app.pages.settings.account.email.title"),
});

let payload: Record<string, string>;

const onSubmit = handleSubmit(async (values) => {
  try {
    await patchReq("/auth/account/email", values);
    payload = values;
    goTo("token");
    toast.success(t("app.pages.settings.account.email.toast.success"));
  } catch {
    toast.error(t("app.pages.settings.account.email.toast.error"));
  } finally {
    setValues({
      newEmail: "",
      newEmailAgain: "",
    });
  }
});

async function handleToken(token: string) {
  isWaiting.value = true;
  try {
    await postReq("/auth/interaction-token/use", {
      token,
      interaction: "change_email",
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
      <UiFormField v-slot="{ componentField }" name="currentEmail">
        <UiFormItem>
          <UiFormLabel>
            {{
              $t("app.pages.settings.account.email.input.currentEmail.label")
            }}
          </UiFormLabel>
          <UiFormControl>
            <UiInput disabled type="email" v-bind="componentField" />
          </UiFormControl>
          <UiFormMessage />
        </UiFormItem>
      </UiFormField>
      <UiFormField v-slot="{ componentField }" name="newEmail">
        <UiFormItem>
          <UiFormLabel>
            {{ $t("app.pages.settings.account.email.input.newEmail.label") }}
          </UiFormLabel>
          <UiFormControl>
            <UiInput type="email" v-bind="componentField" />
          </UiFormControl>
          <UiFormMessage />
        </UiFormItem>
      </UiFormField>
      <UiFormField v-slot="{ componentField }" name="newEmailRepeat">
        <UiFormItem>
          <UiFormLabel>
            {{
              $t("app.pages.settings.account.email.input.newEmailRepeat.label")
            }}
          </UiFormLabel>
          <UiFormControl>
            <UiInput type="email" v-bind="componentField" />
          </UiFormControl>
          <UiFormMessage />
        </UiFormItem>
      </UiFormField>
      <UiButton
        type="submit"
        class="w-fit gap-x-3 px-3 py-2.5"
        :disabled="!isFieldValid('newEmail') || !isFieldValid('newEmailRepeat')"
        :waiting="isSubmitting"
      >
        <IconAtSign :size="20" />
        {{ t("app.pages.settings.account.email.button.change") }}
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
          `app.pages.settings.account.email.message.${isSuccess ? "success" : "error"}`,
          { email: payload?.newEmail || "Noooo" },
        )
      }}</UiMessage
    >
  </NuxtLayout>
</template>
