<script lang="ts" setup>
import type { Payment } from "@repo/client-types";
import { PERMISSIONS } from "@repo/permission-utils";

const { current, goTo } = useStepper(["selectMethod", "paymentCardMethod"]);
const { route, toast, t } = useImports();

const loading = reactive({
  page: true,
  pay: false,
});

const validate = reactive({
  address: false,
  paymentCard: false,
});

const payment = ref({} as Payment);

const form = reactive({
  address: {} as any,
  paymentCard: {} as any,
});

const onPaymentCardPay = () => {
  loading.pay = true;
  postReq(`/payments/${route.params.id}/iyzico`, form)
    .then(() => {
      toast.success(t("app.pages.payments.index.toast.success"));
      navigateTo("/");
    })
    .catch(() => toast.success(t("app.pages.payments.index.toast.error")))
    .finally(() => (loading.pay = false));
};

onMounted(() => {
  getReq(`/payments/${route.params.id}`)
    .then((response) => {
      payment.value = response.data.data;
      loading.page = false;
    })
    .catch(() => {
      navigateTo("/dashboard");
    });
});

definePageMeta({
  middleware: "authentication",
});
</script>

<template>
  <NuxtLayout
    name="app"
    footer
    :perms="PERMISSIONS.user"
    class="flex max-md:flex-col items-start gap-10 mt-24 md:mt-36 mb-10"
  >
    <template v-if="loading.page">
      <UiSkeleton class="w-full md:min-w-[70%] h-[60vh] order-2 md:order-1" />
      <UiSkeleton class="w-full h-[60vh] order-2 md:order-1" />
    </template>
    <template v-else>
      <div
        class="flex flex-col gap-10 w-full md:min-w-[70%] order-2 md:order-1"
      >
        <template v-if="current == 'selectMethod'">
          <UiTypographyTitle>{{
            $t(`app.pages.payments.index.layout.methods.label`)
          }}</UiTypographyTitle>
          <UiButton
            class="justify-center gap-4 w-full h-[60px]"
            variant="outline"
            @click="goTo('paymentCardMethod')"
          >
            <IconCreditCard :size="30" />
            {{
              $t("app.pages.payments.index.layout.methods.items.paymentCard")
            }}
          </UiButton>
        </template>

        <template v-else-if="current == 'paymentCardMethod'">
          <UiTypographyTitle>{{
            $t(`app.pages.payments.index.layout.paymentCardMethod.label1`)
          }}</UiTypographyTitle>
          <PagePaymentCardInformationForm
            v-model="form.paymentCard"
            @validate="(v) => (validate.paymentCard = v)"
          />
          <UiTypographyTitle>{{
            $t(`app.pages.payments.index.layout.paymentCardMethod.label2`)
          }}</UiTypographyTitle>
          <PagePaymentAddressInformationForm
            v-model="form.address"
            @validate="(v) => (validate.address = v)"
          />
          <footer class="flex items-center justify-between">
            <UiButton
              class="gap-2 justify-center px-4 py-3"
              variant="secondary"
              @click="goTo('selectMethod')"
            >
              <IconArrowLeft :size="16" />
              {{ $t("common.prev") }}
            </UiButton>
            <UiButton
              class="gap-2 justify-center px-4 py-3"
              :waiting="loading.pay"
              :disabled="!validate.address || !validate.paymentCard"
              @click="onPaymentCardPay"
            >
              <IconGlobeLock :size="20" />
              {{ $t("common.submit") }}
            </UiButton>
          </footer>
        </template>
      </div>
      <UiCard variant="planet" class="order-1 md:order-2">
        <UiCardHeader class="flex flex-col items-center">
          <UiCardTitle class="text-center" size="xl">
            {{ $t("app.pages.payments.index.sidebar.title") }}
          </UiCardTitle>
          <UiCardDescription class="text-center" size="xl">
            {{
              $t("app.pages.payments.index.sidebar.description")
            }}</UiCardDescription
          >
          <UiCardTitle size="xl"
            >{{ payment.totalPrice }} {{ payment.currency.symbol }}</UiCardTitle
          >
        </UiCardHeader>
        <UiCardContent class="flex flex-col items-start gap-5 w-full">
          <UiCardSubCard v-for="item in payment.basketItems" :key="item.id">
            <template #title>
              {{ item.name }}
            </template>
            <template #description>
              {{ item.price }} {{ payment.currency.symbol }}</template
            >
          </UiCardSubCard>
        </UiCardContent>
      </UiCard>
    </template>
  </NuxtLayout>
</template>
