<script setup lang="ts">
import { PERMISSIONS } from "@repo/permission-utils";

const isOpenWithdrawDialog = ref(false);

const { sessionStore, t, runtimeConfig, toast } = useImports();
const { validationSchema, isSubmitting, handleSubmit } = useValidationForm({
  layout: "finance",
  options: [
    {
      message: t(
        "app.pages.dashboard.index.homepage.withdraw.form.input.fullName.message",
      ),
      field: "fullName",
    },
    {
      message: t(
        "app.pages.dashboard.index.homepage.withdraw.form.input.iban.message",
      ),
      field: "iban",
    },
  ],
});

const onSubmit = handleSubmit(async (values, { resetForm }) =>
  postReq("/users/me/withdraw", values)
    .then(() => {
      toast.success(
        t("app.pages.dashboard.index.homepage.withdraw.form.toast.success"),
      );
      currentUser.value.payment.orbit.pending +=
        currentUser.value.payment.orbit.withdrawable;
      currentUser.value.payment.orbit.withdrawable = 0;
      isOpenWithdrawDialog.value = false;
      navigateTo("/dashboard/finance/transactions");
    })
    .catch(() =>
      toast.error(
        t("app.pages.dashboard.index.homepage.withdraw.form.toast.error"),
      ),
    )
    .finally(resetForm),
);

const currentUser = computed(() => {
  return sessionStore._getUser;
});

definePageMeta({
  middleware: "authentication",
});
</script>

<template>
  <NuxtLayout name="dashboard" :perms="PERMISSIONS.user">
    <SharedToolsSelectCurrencyDropdown />
    <UiSeparator />
    <div class="flex max-xl:flex-col items-center w-full gap-10">
      <UiIntroductionCard>
        <template #icon>
          <h1 class="text-3xl whitespace-nowrap font-bold">
            {{ currentUser?.payment?.orbit?.available || 0 }}
          </h1>
        </template>
        <template #title>
          {{
            $t("app.pages.dashboard.index.homepage.orbits.available.title")
          }}</template
        >
        <template #description>{{
          $t("app.pages.dashboard.index.homepage.orbits.available.description")
        }}</template>
      </UiIntroductionCard>
      <UiIntroductionCard>
        <template #icon>
          <h1 class="text-3xl whitespace-nowrap font-bold">
            {{ currentUser?.payment?.orbit?.pending || 0 }}
          </h1>
        </template>
        <template #title>
          {{
            $t("app.pages.dashboard.index.homepage.orbits.pending.title")
          }}</template
        >
        <template #description>{{
          $t("app.pages.dashboard.index.homepage.orbits.pending.description")
        }}</template>
      </UiIntroductionCard>
    </div>
    <UiIntroductionCard>
      <template #icon>
        <h1 class="text-3xl whitespace-nowrap font-bold">
          {{ currentUser?.payment?.orbit?.withdrawable || 0 }}
        </h1>
      </template>
      <template #title>
        {{
          $t("app.pages.dashboard.index.homepage.orbits.withdrawable.title")
        }}</template
      >
      <template #description>{{
        $t("app.pages.dashboard.index.homepage.orbits.withdrawable.description")
      }}</template>
    </UiIntroductionCard>
    <UiSeparator />
    <UiMessage
      v-if="
        (currentUser?.payment?.orbit?.withdrawable || 0) <
        parseInt(runtimeConfig.app.MIN_WITHDRAWABLE_ORBIT)
      "
      type="error"
    >
      {{
        $t("app.pages.dashboard.index.homepage.withdraw.insufficient", {
          amount: runtimeConfig.app.MIN_WITHDRAWABLE_ORBIT,
        })
      }}</UiMessage
    >
    <UiIntroductionCard
      :aria-disabled="
        (currentUser?.payment?.orbit?.withdrawable || 0) <
        parseInt(runtimeConfig.app.MIN_WITHDRAWABLE_ORBIT)
      "
    >
      <template #icon>
        <IconArrowLeftRight :size="60" />
      </template>
      <template #title>
        {{ $t("app.pages.dashboard.index.homepage.withdraw.title") }}</template
      >
      <template #description>{{
        $t("app.pages.dashboard.index.homepage.withdraw.description")
      }}</template>
      <template #button>
        <UiDialog v-model:open="isOpenWithdrawDialog">
          <UiDialogTrigger>
            <UiButton as="span" class="px-5 py-1.5">
              {{ $t("app.pages.dashboard.index.homepage.withdraw.button") }}
            </UiButton>
          </UiDialogTrigger>
          <UiDialogContent class="flex flex-col items-end gap-5">
            <UiDialogHeader>
              <template #title>
                {{
                  $t("app.pages.dashboard.index.homepage.withdraw.form.title")
                }}
              </template>
            </UiDialogHeader>
            <UiMessage type="info">{{
              $t("app.pages.dashboard.index.homepage.withdraw.form.message")
            }}</UiMessage>
            <form
              :validation-schema="validationSchema"
              class="flex flex-col items-end w-full gap-5"
              @submit="onSubmit"
            >
              <UiFormField v-slot="{ componentField }" name="fullName">
                <UiFormItem>
                  <UiFormLabel>
                    {{
                      $t(
                        "app.pages.dashboard.index.homepage.withdraw.form.input.fullName.label",
                      )
                    }}
                  </UiFormLabel>
                  <UiFormControl>
                    <UiInput
                      size="sm"
                      :placeholder="
                        $t(
                          'app.pages.dashboard.index.homepage.withdraw.form.input.fullName.placeholder',
                        )
                      "
                      v-bind="componentField"
                    />
                  </UiFormControl>
                  <UiFormMessage />
                </UiFormItem>
              </UiFormField>
              <UiFormField v-slot="{ componentField }" name="iban">
                <UiFormItem>
                  <UiFormLabel>
                    {{
                      $t(
                        "app.pages.dashboard.index.homepage.withdraw.form.input.iban.label",
                      )
                    }}
                  </UiFormLabel>
                  <UiFormControl>
                    <UiInput
                      size="sm"
                      :placeholder="
                        $t(
                          'app.pages.dashboard.index.homepage.withdraw.form.input.iban.placeholder',
                        )
                      "
                      v-bind="componentField"
                    />
                  </UiFormControl>
                  <UiFormMessage />
                </UiFormItem>
              </UiFormField>
              <UiButton
                :waiting="isSubmitting"
                type="submit"
                class="gap-x-2 px-4 py-3"
                align="center"
              >
                <IconArrowLeftRight :size="20" />
                {{
                  $t("app.pages.dashboard.index.homepage.withdraw.form.button")
                }}
              </UiButton>
            </form>
          </UiDialogContent>
        </UiDialog>
      </template>
    </UiIntroductionCard>
  </NuxtLayout>
</template>
