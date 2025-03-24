import * as yup from "yup";

export const searchSchema = yup.object({
  searchQuery: yup
    .string()
    .required("Location is required")
    .min(2, "Location must be at least 2 characters"),
});

export type SearchFormData = yup.InferType<typeof searchSchema>;
