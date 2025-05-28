<script setup lang="ts">
const { t } = useImports();
const { validationSchema, values, isFieldValid } = useValidationForm({
  layout: "paymentCard",
  options: [
    {
      field: "cardNumber",
      message: t(
        "app.components.page.payment.paymentCardInformationForm.input.cardNumber.message",
      ),
    },
    {
      field: "cardHolderName",
      message: t(
        "app.components.page.payment.paymentCardInformationForm.input.cardHolderName.message",
      ),
    },
    {
      field: "cvc",
      message: t(
        "app.components.page.payment.paymentCardInformationForm.input.cvc.message",
      ),
    },
    {
      field: "expireDate",
      message: t(
        "app.components.page.payment.paymentCardInformationForm.input.expireDate.message",
      ),
    },
  ],
});

const props = defineProps<{ modelValue?: object }>();
const emits = defineEmits<{
  "update:modelValue": object[];
  validate: boolean[];
}>();

const modelValue = useVModel(props, "modelValue", emits, {
  passive: true,
  defaultValue: values,
});

const isValid = computed(() => {
  return (
    isFieldValid("cardNumber") &&
    isFieldValid("cardHolderName") &&
    isFieldValid("cvc") &&
    isFieldValid("expireDate")
  );
});

watchEffect(() => {
  modelValue.value = values;
  emits("validate", isValid.value);
});
</script>

<template>
  <form
    :validation-schema="validationSchema"
    class="flex flex-col items-end gap-10"
  >
    <UiFormField v-slot="{ componentField }" name="cardNumber">
      <UiFormItem>
        <UiFormLabel>
          {{
            t(
              "app.components.page.payment.paymentCardInformationForm.input.cardNumber.label",
            )
          }}
        </UiFormLabel>
        <UiFormControl>
          <PagePaymentInputCardNumber v-bind="componentField" />
        </UiFormControl>
        <UiFormMessage />
      </UiFormItem>
    </UiFormField>
    <div class="w-full grid grid-cols-2 items-start gap-5">
      <UiFormField v-slot="{ componentField }" name="cardHolderName">
        <UiFormItem>
          <UiFormLabel>
            {{
              t(
                "app.components.page.payment.paymentCardInformationForm.input.cardHolderName.label",
              )
            }}
          </UiFormLabel>
          <UiFormControl>
            <UiInput v-bind="componentField" placeholder="John Doe" />
          </UiFormControl>
          <UiFormMessage />
        </UiFormItem>
      </UiFormField>
      <UiFormField v-slot="{ componentField }" name="cvc">
        <UiFormItem>
          <UiFormLabel> Cvc </UiFormLabel>
          <UiFormControl>
            <UiInput v-bind="componentField" placeholder="123" />
          </UiFormControl>
          <UiFormMessage />
        </UiFormItem>
      </UiFormField>
    </div>
    <UiFormField v-slot="{ componentField }" name="expireDate">
      <UiFormItem>
        <UiFormLabel>
          {{
            t(
              "app.components.page.payment.paymentCardInformationForm.input.expireDate.label",
            )
          }}
        </UiFormLabel>
        <UiFormControl>
          <PagePaymentInputCardExpiredDate v-bind="componentField" />
        </UiFormControl>
        <UiFormMessage />
      </UiFormItem>
    </UiFormField>
  </form>
</template>
