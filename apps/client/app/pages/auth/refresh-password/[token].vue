<script lang="ts" setup>
const { route, t, toast } = useImports();
const { goToNext, isLast } = useStepper(["check", "change"]);
const { validationSchema, isSubmitting, handleSubmit } = useValidationForm({
  layout: "user",
  options: [
    {
      message: t("app.pages.auth.refreshPassword.input.password.message"),
      field: "password",
    },
  ],
});

const token = route.params.token;

const layout = reactive({
  label: t("app.pages.auth.refreshPassword.label"),
  sublabel: t("app.pages.auth.refreshPassword.sublabel"),
  loaded: false,
  footer: {
    button: {
      text: t("app.pages.auth.refreshPassword.footer.button"),
      to: "/auth/login",
    },
  },
});

const onSubmit = handleSubmit(async (values, { resetForm }) => {
  try {
    await postReq("/auth/refresh-password", {
      newPassword: values.password,
      token,
    });
    toast.success(t("app.pages.auth.refreshPassword.toast.success"));
    navigateTo("/auth/login");
  } catch {
    toast.error(t("app.pages.auth.refreshPassword.toast.error"));
  } finally {
    resetForm();
  }
});

tryOnMounted(async () => {
  if (!token) {
    return navigateTo("/auth/forgot-password");
  }

  try {
    await postReq("/auth/interaction-token/verify", {
      interaction: "forgot_password",
      token,
    });

    goToNext();
  } catch {
    toast.error(t("app.pages.auth.refreshPassword.toast.error"));
  } finally {
    layout.loaded = true;
  }
});
</script>

<template>
  <NuxtLayout name="auth" v-bind="layout">
    <form
      v-if="isLast"
      class="flex flex-col items-start w-full gap-5"
      :validation-schema="validationSchema"
      @submit="onSubmit"
    >
      <UiFormField v-slot="{ componentField }" name="password">
        <UiFormItem>
          <UiFormLabel>
            {{ $t("app.pages.auth.refreshPassword.input.password.label") }}
          </UiFormLabel>
          <UiFormControl>
            <UiInput type="password" size="sm" v-bind="componentField" />
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
        <IconRotateCw :size="18" />
      </UiButton>
    </form>
  </NuxtLayout>
</template>
