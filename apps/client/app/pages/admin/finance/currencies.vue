<script setup lang="ts">
import { PERMISSIONS } from "@repo/permission-utils";

const { t, toast } = useImports();
const { validationSchema, isSubmitting, handleSubmit } = useValidationForm({
  layout: "finance",
  options: [
    {
      message: t("app.pages.admin.finance.currencies.input.name.message"),
      field: "name",
      children: "currency.name",
    },
    {
      message: t("app.pages.admin.finance.currencies.input.symbol.message"),
      field: "symbol",
      children: "currency.symbol",
    },
    {
      message: t("app.pages.admin.finance.currencies.input.code.message"),
      field: "code",
      children: "currency.code",
    },
    {
      message: t("app.pages.admin.finance.currencies.input.rate.message"),
      field: "rate",
      children: "currency.rate",
    },
  ],
  initialValues: {
    name: "",
    symbol: "",
    code: "",
    rate: 1,
  },
});

interface WaitingItem {
  rate?: boolean;
  code?: boolean;
  name?: boolean;
  symbol?: boolean;
  delete?: boolean;
}

const waiting = reactive<Record<string, WaitingItem>>({});

function setWaiting(id: string, key: keyof WaitingItem, state: boolean) {
  if (!waiting[id]) {
    waiting[id] = {};
  }
  waiting[id][key] = state;
}

async function onChange(item: any, key: keyof WaitingItem, value: any) {
  setWaiting(item.id, key, true);
  try {
    await postReq(`/admin/manage/currencies/${item.id}/edit`, { [key]: value });
    item[key] = value;
  } catch {
    toast.error(t("common.error.default"));
  } finally {
    setWaiting(item.id, key, false);
  }
}

async function onDelete(item: any) {
  setWaiting(item.id, "delete", true);
  try {
    await deleteReq(`/admin/manage/currencies/${item.id}`);
  } catch {
    toast.error(t("common.error.default"));
  } finally {
    setWaiting(item.id, "delete", false);
  }
}

const onSubmit = handleSubmit(async (values, { resetForm }) =>
  postReq("/admin/manage/currencies", values)
    .then(() =>
      toast.success(t("app.pages.admin.finance.currencies.toast.success")),
    )
    .catch(() =>
      toast.error(t("app.pages.admin.finance.currencies.toast.error")),
    )
    .finally(resetForm),
);

definePageMeta({
  middleware: "authentication",
});
</script>

<template>
  <NuxtLayout name="admin" :perms="PERMISSIONS.financier">
    <form
      united="introduction-card"
      class="flex flex-col items-center w-full gap-10"
      :validation-schema="validationSchema"
      @submit="onSubmit"
    >
      <div
        class="flex flex-col sm:flex-row md:flex-col lg:flex-row items-start w-full gap-10"
      >
        <UiFormField v-slot="{ componentField }" name="name">
          <UiFormItem>
            <UiFormLabel>
              {{ $t("app.pages.admin.finance.currencies.input.name.label") }}
            </UiFormLabel>
            <UiFormControl>
              <UiInput
                size="sm"
                placeholder="US Dollar"
                v-bind="componentField"
              />
            </UiFormControl>
            <UiFormMessage />
          </UiFormItem>
        </UiFormField>
        <UiFormField v-slot="{ componentField }" name="symbol">
          <UiFormItem>
            <UiFormLabel>
              {{ $t("app.pages.admin.finance.currencies.input.symbol.label") }}
            </UiFormLabel>
            <UiFormControl>
              <UiInput size="sm" placeholder="$" v-bind="componentField" />
            </UiFormControl>
            <UiFormMessage />
          </UiFormItem>
        </UiFormField>
        <UiFormField v-slot="{ componentField }" name="code">
          <UiFormItem>
            <UiFormLabel>
              {{ $t("app.pages.admin.finance.currencies.input.code.label") }}
            </UiFormLabel>
            <UiFormControl>
              <UiInput size="sm" placeholder="USD" v-bind="componentField" />
            </UiFormControl>
            <UiFormMessage />
          </UiFormItem>
        </UiFormField>
        <UiFormField v-slot="{ componentField }" name="rate">
          <UiFormItem>
            <UiFormLabel>
              {{ $t("app.pages.admin.finance.currencies.input.rate.label") }}
            </UiFormLabel>
            <UiFormControl>
              <UiNumberField
                size="sm"
                :default-value="0"
                :min="0"
                :max="1000"
                v-bind="componentField"
              />
            </UiFormControl>
            <UiFormMessage />
          </UiFormItem>
        </UiFormField>
      </div>
      <UiButton
        :waiting="isSubmitting"
        type="submit"
        class="w-full py-3"
        align="center"
      >
        {{ $t("app.pages.admin.finance.currencies.button") }}
      </UiButton>
    </form>
    <UiSuperPaginatedTable
      united="introduction-card"
      :items-per-page="10"
      item-key="currencies"
      :request="{ url: `/config/currencies` }"
      :heads="[
        {
          value: 'delete',
        },
        {
          name: $t('app.pages.admin.finance.currencies.table.head.name'),
          value: 'name',
          class: 'min-w-[200px]',
        },
        {
          name: $t('app.pages.admin.finance.currencies.table.head.symbol'),
          value: 'symbol',
          class: 'min-w-[200px]',
        },
        {
          name: $t('app.pages.admin.finance.currencies.table.head.code'),
          value: 'code',
          class: 'min-w-[200px]',
        },
        {
          name: $t('app.pages.admin.finance.currencies.table.head.rate'),
          value: 'rate',
          class: 'min-w-[200px]',
        },
      ]"
    >
      <template #delete="{ item }">
        <UiButton
          :waiting="waiting[item.id]?.delete"
          variant="ghost"
          class="p-2"
          align="center"
          @click="onDelete(item)"
        >
          <IconTrash :size="20" />
        </UiButton>
      </template>
      <template #name="{ item }">
        <UiEditableInput
          type="string"
          size="sm"
          :waiting="waiting[item.id]?.name"
          :value="item.name"
          :min-length="1"
          @submit="(v) => onChange(item, 'name', v)"
        />
      </template>
      <template #symbol="{ item }">
        <UiEditableInput
          type="string"
          size="sm"
          :waiting="waiting[item.id]?.symbol"
          :value="item.symbol"
          :min-length="1"
          @submit="(v) => onChange(item, 'symbol', v)"
        />
      </template>
      <template #code="{ item }">
        <UiEditableInput
          type="string"
          size="sm"
          :waiting="waiting[item.id]?.code"
          :value="item.code"
          :min-length="1"
          @submit="(v) => onChange(item, 'code', v)"
        />
      </template>
      <template #rate="{ item }">
        <UiEditableInput
          type="number"
          size="sm"
          :waiting="waiting[item.id]?.rate"
          :value="item.rate"
          :min="1"
          :max="1000"
          @submit="(v) => onChange(item, 'rate', v)"
        />
      </template>
    </UiSuperPaginatedTable>
  </NuxtLayout>
</template>
