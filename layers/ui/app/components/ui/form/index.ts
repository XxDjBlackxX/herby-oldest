import type { InputTypeHTMLAttribute } from "vue";

export { default as FormControl } from "./FormControl.vue";
export { default as FormDescription } from "./FormDescription.vue";
export { default as FormItem } from "./FormItem.vue";
export { default as FormLabel } from "./FormLabel.vue";
export { default as FormMessage } from "./FormMessage.vue";
export { default as FormGroup } from "./FormGroup.vue";
export { FORM_ITEM_INJECTION_KEY } from "./injectionKeys";
export { Field as FormField, Form } from "vee-validate";

export type InputProps = {
  label?: string;
  modelValue?: string;
  defaultValue?: string;
  type?: InputTypeHTMLAttribute;
  size?: "large" | "small" | "big";
  placeholder?: string;
  class?: string;
  disabled?: boolean;
  required?: boolean;
  validate?: "password" | "username" | "email" | "name" | "surname";
};

export type FormGroupProps = {
  disabled?: boolean;
  class?: string;
};

export type InputEmits = {
  "update:modelValue": string[];
};

export type TextareaProps = {
  label?: string;
  modelValue?: string;
  type?: InputTypeHTMLAttribute;
  minHeight?: string | number;
  maxHeight?: string | number;
  required?: boolean;
  disabled?: boolean;
  class?: string;
  placeholder?: string;
};

export type TextareaEmits = {
  "update:modelValue": string[];
};
