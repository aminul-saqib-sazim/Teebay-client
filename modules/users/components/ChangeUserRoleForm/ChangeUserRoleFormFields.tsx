import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/shadui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/shadui/select";
import { IRoleResponse } from "@/shared/typedefs/api";

import { useChangeUserRoleForm } from "./ChangeUserRoleForm.hooks";

const ChangeUserRoleFormFields = ({
  roles,
  form,
}: {
  form: ReturnType<typeof useChangeUserRoleForm>["form"];
  userId?: number;
  roles: IRoleResponse[];
}) => (
  <>
    <FormField
      control={form.control}
      name="roleId"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Role</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {roles.map((role) => (
                <SelectItem key={role.id} value={role.id.toString()}>
                  {role.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  </>
);

export default ChangeUserRoleFormFields;
