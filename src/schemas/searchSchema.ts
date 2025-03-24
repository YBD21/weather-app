import * as yup from "yup";

export const searchSchema = yup.object({
  searchQuery: yup
    .string()
    .transform((value) => (value ? value.trim().replace(/\s+/g, " ") : "")),
});

export type SearchFormData = yup.InferType<typeof searchSchema>;
