<script setup lang="ts">
import { COUNTRIES, COUNTRY_STATES } from "@repo/global-config";

const { t } = useImports();
const { isFieldValid, validationSchema, values } = useValidationForm({
  layout: "address",
  options: [
    {
      field: "addressLine",
      message: t(
        "app.components.page.payment.addressInformationForm.input.addressLine.message",
      ),
    },
    {
      field: "city",
      message: t(
        "app.components.page.payment.addressInformationForm.input.city.message",
      ),
    },
    {
      field: "country",
      message: t(
        "app.components.page.payment.addressInformationForm.input.country.message",
      ),
    },
    {
      field: "zipCode",
      message: t(
        "app.components.page.payment.addressInformationForm.input.zipCode.message",
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
    isFieldValid("city") &&
    isFieldValid("country") &&
    isFieldValid("zipCode") &&
    isFieldValid("addressLine")
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
    <UiFormField v-slot="{ componentField }" name="country">
      <UiFormItem>
        <UiFormLabel>
          {{
            $t(
              "app.components.page.payment.addressInformationForm.input.country.label",
            )
          }}
        </UiFormLabel>
        <UiFormControl>
          <UiSuperSelect v-bind="componentField">
            <UiSuperSelectTrigger size="sm">
              {{
                COUNTRIES.find((c) => c.value === componentField.modelValue)
                  ?.name ||
                $t(
                  "app.components.page.payment.addressInformationForm.input.country.placeholder",
                )
              }}
            </UiSuperSelectTrigger>
            <UiSuperSelectContent>
              <UiSuperSelectGroup>
                <UiSuperSelectItem
                  v-for="c in COUNTRIES"
                  :key="c.value"
                  :value="c.value"
                >
                  {{ c.name }}
                </UiSuperSelectItem>
              </UiSuperSelectGroup>
            </UiSuperSelectContent>
          </UiSuperSelect>
        </UiFormControl>
        <UiFormMessage />
      </UiFormItem>
    </UiFormField>
    <UiFormField v-slot="{ componentField }" name="city">
      <UiFormItem>
        <UiFormLabel>{{
          $t(
            "app.components.page.payment.addressInformationForm.input.city.label",
          )
        }}</UiFormLabel>
        <UiFormControl>
          <UiSuperSelect v-bind="componentField">
            <UiSuperSelectTrigger
              size="sm"
              :disabled="!isFieldValid('country')"
            >
              {{
                COUNTRY_STATES.find(
                  (s) => s.name == values.country,
                )?.states?.find(
                  (state) => state == componentField.modelValue,
                ) ||
                $t(
                  "app.components.page.payment.addressInformationForm.input.city.placeholder",
                )
              }}
            </UiSuperSelectTrigger>
            <UiSuperSelectContent>
              <UiSuperSelectGroup>
                <UiSuperSelectItem
                  v-for="state in COUNTRY_STATES.find(
                    (s) => s.name == values.country,
                  )?.states"
                  :key="state"
                  :value="state"
                >
                  {{ state }}
                </UiSuperSelectItem>
              </UiSuperSelectGroup>
            </UiSuperSelectContent>
          </UiSuperSelect>
        </UiFormControl>
        <UiFormMessage />
      </UiFormItem>
    </UiFormField>
    <UiFormField v-slot="{ componentField }" name="addressLine">
      <UiFormItem>
        <UiFormLabel>
          {{
            $t(
              "app.components.page.payment.addressInformationForm.input.addressLine.label",
            )
          }}
        </UiFormLabel>
        <UiFormControl>
          <UiInput
            v-bind="componentField"
            type="text"
            :placeholder="
              $t(
                'app.components.page.payment.addressInformationForm.input.addressLine.placeholder',
              )
            "
            :disabled="!isFieldValid('country') || !isFieldValid('city')"
          />
        </UiFormControl>
        <UiFormMessage />
      </UiFormItem>
    </UiFormField>
    <UiFormField v-slot="{ componentField }" name="zipCode">
      <UiFormItem>
        <UiFormLabel>
          {{
            $t(
              "app.components.page.payment.addressInformationForm.input.zipCode.label",
            )
          }}
        </UiFormLabel>
        <UiFormControl>
          <UiInput
            v-bind="componentField"
            type="text"
            placeholder="41050"
            :disabled="!isFieldValid('country') || !isFieldValid('city')"
          />
        </UiFormControl>
        <UiFormMessage />
      </UiFormItem>
    </UiFormField>
  </form>
</template>
