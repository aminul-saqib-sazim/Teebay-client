import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { TSignUpFormFields } from "./SignUpForm.types";

export const signUpFormInitialValues: TSignUpFormFields = {
  email: "",
  password: "",
  userProfile: {
    firstName: "",
    lastName: "",
  },
  confirmPassword: "",
};

export const signUpFormValidationSchema: z.ZodType<typeof signUpFormInitialValues> = z
  .object({
    userProfile: z.object({
      firstName: z.string().min(1, "Required"),
      lastName: z.string().min(1, "Required"),
    }),
    email: z.string().email("Invalid email").min(1, "Required"),
    password: z.string().min(8, "Must be at least 8 characters long"),
    confirmPassword: z.string().min(1, "Required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const signUpFormValidationSchemaResolver = zodResolver(signUpFormValidationSchema);
