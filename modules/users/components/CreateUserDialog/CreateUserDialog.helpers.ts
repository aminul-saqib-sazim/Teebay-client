import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { TCreateUserFormFields } from "./CreateUserDialog.types";

export const createUserFormInitialValues: TCreateUserFormFields = {
  email: "",
  password: "",
  userProfile: {
    firstName: "",
    lastName: "",
    roleId: 0,
  },
  confirmPassword: "",
};

export const createUserFormValidationSchema: z.ZodType<TCreateUserFormFields> = z
  .object({
    email: z.string().email("Invalid email").min(1, "Required"),
    password: z.string().min(8, "Must be at least 8 characters long"),
    confirmPassword: z.string().min(1, "Required"),
    userProfile: z.object({
      firstName: z.string().min(1, "Required"),
      lastName: z.string().min(1, "Required"),
      roleId: z.number().min(1, "Required"),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const createUserFormResolver = zodResolver(createUserFormValidationSchema);
