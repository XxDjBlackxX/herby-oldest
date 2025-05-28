<script lang="ts" setup>
const { t, toast } = useImports();
const { validationSchema, isSubmitting, handleSubmit } = useValidationForm({
  layout: "user",
  options: [
    {
      message: t("app.pages.auth.forgotPassword.input.email.message"),
      field: "email",
    },
  ],
});

const layout = reactive({
  label: t("app.pages.auth.forgotPassword.label"),
  sublabel: t("app.pages.auth.forgotPassword.sublabel"),
  footer: {
    button: {
      text: t("app.pages.auth.forgotPassword.footer.button"),
      to: "/auth/login",
    },
  },
  loaded: true,
});

const onSubmit = handleSubmit(async (values, { resetForm }) => {
  layout.loaded = false;
  try {
    await postReq("/auth/forgot-password", {
      ...values,
      redirect_uri: `${window.location.origin}/auth/refresh-password/[code]`,
    });
    navigateTo("/auth/login");
    toast.success(t("app.pages.auth.forgotPassword.toast.success"));
  } catch {
    toast.error(t("app.pages.auth.forgotPassword.toast.error"));
  } finally {
    layout.loaded = true;
    resetForm();
  }
});
</script>

<template>
  <NuxtLayout name="auth" v-bind="layout">
    <form
      class="flex flex-col items-start w-full gap-5"
      :validation-schema="validationSchema"
      @submit="onSubmit"
    >
      <UiFormField v-slot="{ componentField }" name="email">
        <UiFormItem>
          <UiFormLabel>
            {{ $t("app.pages.auth.forgotPassword.input.email.label") }}
          </UiFormLabel>
          <UiFormControl>
            <UiInput type="email" size="sm" v-bind="componentField" />
          </UiFormControl>
          <UiFormMessage />
        </UiFormItem>
      </UiFormField>
      <UiButton
        type="submit"
        class="w-fit gap-x-2 px-3 py-2.5"
        align="center"
        :waiting="isSubmitting"
      >
        {{ t("common.submit") }}
        <IconSendHorizonal :size="18" />
      </UiButton>
    </form>
  </NuxtLayout>
</template>
