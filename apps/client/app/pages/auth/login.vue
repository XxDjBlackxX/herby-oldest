<script lang="ts" setup>
const { t, toast } = useImports();
const { goToNext, isFirst, isLast, goBackTo } = useStepper(["check", "verify"]);
const { validationSchema, isSubmitting, handleSubmit } = useValidationForm({
  layout: "user",
  options: [
    { message: t("app.pages.auth.login.input.email.message"), field: "email" },
    {
      message: t("app.pages.auth.login.input.password.message"),
      field: "password",
    },
  ],
});

const isWaiting = ref(false);

const layout = reactive({
  label: t("app.pages.auth.login.label"),
  sublabel: t("app.pages.auth.login.sublabel"),
  footer: {
    button: {
      text: t("app.pages.auth.login.footer.button"),
      to: "/auth/register",
    },
  },
  timeline: [
    t("app.pages.auth.login.timeline.verify"),
    t("app.pages.auth.login.timeline.submit"),
  ],
  loaded: true,
  loginWith: true,
});

let payload: Record<string, string>;

const onSubmit = handleSubmit(async (values, { resetForm }) => {
  layout.loaded = false;
  try {
    const response = await postReq("/auth/login", values);
    if (response.status == 201) {
      goToNext();
      payload = values;
    } else {
      await setUser(response.data.data.access_token);
    }
  } catch {
    toast.error(t("app.pages.auth.login.toast.error"));
  } finally {
    layout.loaded = true;
    resetForm();
  }
});

async function handleToken(token?: string) {
  isWaiting.value = true;
  try {
    const response = await postReq("/auth/login", {
      token,
      ...payload,
    });
    await setUser(response.data.data.access_token);
  } catch {
    goBackTo("check");
    toast.error(t("app.pages.auth.login.toast.error"));
    isWaiting.value = false;
  }
}

async function setUser(access_token: string) {
  if (!access_token) return;
  const session = useSession();
  session.login(access_token);
  toast.success(t("app.pages.auth.login.toast.success"));
  await navigateTo("/");
  return true;
}
</script>

<template>
  <NuxtLayout name="auth" v-bind="layout">
    <UiPinInput
      v-if="isLast"
      :repeat="5"
      :waiting="isWaiting"
      @complate="handleToken"
    />
    <form
      v-if="isFirst"
      class="flex flex-col items-start w-full gap-5"
      :validation-schema="validationSchema"
      @submit="onSubmit"
    >
      <UiFormField v-slot="{ componentField }" name="email">
        <UiFormItem>
          <UiFormLabel>
            {{ $t("app.pages.auth.login.input.email.label") }}
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
            {{ $t("app.pages.auth.login.input.password.label") }}
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
        <IconLogIn :size="18" />
      </UiButton>
    </form>
  </NuxtLayout>
</template>
