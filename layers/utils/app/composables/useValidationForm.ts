import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import * as schemas from "@repo/validation";

export type FormFieldConfig = {
  field: string;
  message: string;
  children?: string;
};

export type Layout =
  | "user"
  | "soundbite"
  | "address"
  | "paymentCard"
  | "finance";

export type UseValidationFormConfig<T = Record<string, unknown>> = {
  layout: Layout;
  options: FormFieldConfig[];
  initialValues?: T;
};

type SchemaFactory = (opts: {
  required_error?: string;
  message?: string;
}) => z.ZodTypeAny;

const layoutMapping: Record<Layout, Record<string, SchemaFactory>> = {
  user: {
    email: schemas.user.isEmail,
    password: schemas.user.isPassword,
    username: schemas.user.isUsername,
    name: schemas.user.isName,
    surname: schemas.user.isSurname,
    description: schemas.user.isDescription,
  },
  soundbite: {
    title: schemas.soundbite.isTitle,
    visibility: schemas.soundbite.isVisibility,
    tags: schemas.soundbite.isTags,
    thumbnail: schemas.soundbite.isThumbnail,
  },
  address: {
    country: schemas.address.isCountry,
    addressLine: schemas.address.isAddressLine,
    city: schemas.address.isCity,
    zipCode: schemas.address.isZipCode,
  },
  paymentCard: {
    cvc: schemas.paymentCard.isCvc,
    cardHolderName: schemas.paymentCard.isCardHolderName,
    expireMonth: schemas.paymentCard.isExpireMonth,
    expireYear: schemas.paymentCard.isExpireYear,
    cardNumber: schemas.paymentCard.isCardNumber,
    expireDate: schemas.paymentCard.isExpireDate,
  },
  finance: {
    "currency.code": schemas.finance.currency.isCode,
    "currency.name": schemas.finance.currency.isName,
    "currency.rate": schemas.finance.currency.isRate,
    "currency.symbol": schemas.finance.currency.isSymbol,
    fullName: schemas.user.isFullName,
    iban: schemas.finance.isIban,
  },
};

export const useValidationForm = <
  T extends Record<string, unknown> = Record<string, unknown>,
>(
  config: UseValidationFormConfig<T>,
) => {
  const { layout, options, initialValues } = config;
  const group = layoutMapping[layout];

  if (!group) {
    throw new Error(`No validation group found for layout: ${layout}`);
  }

  const shape = options.reduce<Record<string, z.ZodTypeAny>>(
    (acc, { field, message, children }) => {
      const schemaKey = children ?? field;
      const schemaFactory = group[schemaKey];
      acc[field] =
        typeof schemaFactory === "function"
          ? schemaFactory({ required_error: message, message })
          : z.any();
      return acc;
    },
    {},
  );

  const validationSchema = toTypedSchema(z.object(shape));

  const form = useForm({
    validationSchema,
    initialValues,
  });

  return { ...form, validationSchema };
};
