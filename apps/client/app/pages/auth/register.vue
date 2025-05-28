<script lang="ts" setup>
const { t, toast } = useImports();
const { validationSchema, isSubmitting, handleSubmit } = useValidationForm({
  layout: "user",
  options: [
    {
      message: t("app.pages.auth.register.input.username.message"),
      field: "username",
    },
    {
      message: t("app.pages.auth.register.input.name.message"),
      field: "name",
    },
    {
      message: t("app.pages.auth.register.input.surname.message"),
      field: "surname",
    },
    {
      message: t("app.pages.auth.register.input.email.message"),
      field: "email",
    },
    {
      message: t("app.pages.auth.register.input.password.message"),
      field: "password",
    },
  ],
});

const layout = reactive({
  label: t("app.pages.auth.register.label"),
  sublabel: t("app.pages.auth.register.sublabel"),
  footer: {
    button: {
      text: t("app.pages.auth.register.footer.button"),
      to: "/auth/login",
    },
  },
  loaded: true,
});

const onSubmit = handleSubmit(async (values, { resetForm }) => {
  layout.loaded = false;
  try {
    await postReq("/auth/register", values);
    toast.success(t("app.pages.auth.register.toast.success"));
    navigateTo("/auth/login");
  } catch {
    toast.error(t("app.pages.auth.register.toast.error"));
  } finally {
    layout.loaded = true;
    resetForm();
  }
});
</script>

<template>
  <div>
    <NuxtLayout name="auth" v-bind="layout">
      <form
        class="flex flex-col items-start w-full gap-5"
        :validation-schema="validationSchema"
        @submit="onSubmit"
      >
        <UiFormField v-slot="{ componentField }" name="name">
          <UiFormItem>
            <UiFormLabel>
              {{ $t("app.pages.auth.register.input.name.label") }}
            </UiFormLabel>
            <UiFormControl>
              <UiInput size="sm" placeholder="John" v-bind="componentField" />
            </UiFormControl>
            <UiFormMessage />
          </UiFormItem>
        </UiFormField>
        <UiFormField v-slot="{ componentField }" name="surname">
          <UiFormItem>
            <UiFormLabel>
              {{ $t("app.pages.auth.register.input.surname.label") }}
            </UiFormLabel>
            <UiFormControl>
              <UiInput size="sm" placeholder="Doe" v-bind="componentField" />
            </UiFormControl>
            <UiFormMessage />
          </UiFormItem>
        </UiFormField>
        <UiFormField v-slot="{ componentField }" name="username">
          <UiFormItem>
            <UiFormLabel>
              {{ $t("app.pages.auth.register.input.username.label") }}
            </UiFormLabel>
            <UiFormControl>
              <UiInput
                size="sm"
                placeholder="xjectro"
                v-bind="componentField"
              />
            </UiFormControl>
            <UiFormMessage />
          </UiFormItem>
        </UiFormField>
        <UiFormField v-slot="{ componentField }" name="email">
          <UiFormItem>
            <UiFormLabel>
              {{ $t("app.pages.auth.register.input.email.label") }}
            </UiFormLabel>
            <UiFormControl>
              <UiInput type="email" size="sm" v-bind="componentField" />
            </UiFormControl>
            <UiFormMessage />
          </UiFormItem>
        </UiFormField>
        <UiFormField v-slot="{ componentField }" name="password">
          <UiFormItem>
            <UiFormLabel>
              {{ $t("app.pages.auth.register.input.password.label") }}
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
          <IconCheck :size="18" />
        </UiButton>
      </form>
    </NuxtLayout>
  </div>
</template>
