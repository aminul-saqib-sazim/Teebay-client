import { UseFormReturn } from "react-hook-form";

import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/shadui/card";
import { Input } from "@/shared/components/shadui/input";
import { Label } from "@/shared/components/shadui/label";
import { IUserProfileResponse, IUpdateUserProfileDto } from "@/shared/typedefs/api";

import UpdateProfileInformationFormFields from "../UpdateProfileInformationForm";

const ProfileInformation = ({
  userProfile,
  form,
}: {
  userProfile: IUserProfileResponse;
  form: UseFormReturn<IUpdateUserProfileDto>;
}) => (
  <Card>
    <CardHeader>
      <CardTitle>Profile Information</CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      <UpdateProfileInformationFormFields form={form} />
      <div>
        <Label htmlFor="role">Role</Label>
        <Input id="role" name="role" value={userProfile.role.name} disabled className="bg-muted" />
      </div>
    </CardContent>
  </Card>
);

export default ProfileInformation;
