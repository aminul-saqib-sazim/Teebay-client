import { UseFormReturn } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/shadui/form";
import { Input } from "@/shared/components/shadui/input";
import { IUpdateUserProfileDto } from "@/shared/typedefs/api";

const UpdateProfileInformationFormFields = ({
  form,
}: {
  form: UseFormReturn<IUpdateUserProfileDto>;
}) => {
  const isSubmitting = form.formState.isSubmitting;

  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <FormField
            disabled={isSubmitting}
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="First Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div>
          <FormField
            disabled={isSubmitting}
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Last Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </>
  );
};

export default UpdateProfileInformationFormFields;
