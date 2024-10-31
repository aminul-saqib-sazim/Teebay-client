import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { TSignInFormFields } from "./SignInForm.types";

export const signInFormInitialValues: TSignInFormFields = {
  email: "",
  password: "",
};

export const signInFormValidationSchema = z.object({
  email: z.string().email("Invalid email").min(1, "Required"),
  password: z.string().min(8, "Must be at least 8 characters long"),
});

export const signInFormValidationSchemaResolver = zodResolver(signInFormValidationSchema);
