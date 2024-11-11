import SettingsContainer from "@/modules/settings/container/SettingsContainer";
import { withAllowedRoles } from "@/shared/components/hocs/withAllowedRoles";
import AuthGuard from "@/shared/components/wrappers/AuthGuard";
import AuthenticatedLayout from "@/shared/layouts/AuthenticatedLayout";
import { NextApplicationPage } from "@/shared/typedefs";
import { EUserRole } from "@/shared/typedefs/api";

const SettingsPage: NextApplicationPage = () => <SettingsContainer />;

SettingsPage.Layout = AuthenticatedLayout;
SettingsPage.Guard = withAllowedRoles(AuthGuard, [EUserRole.ADMIN, EUserRole.SUPER_USER]);

export default SettingsPage;
