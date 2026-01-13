import SettingsContainer from "@/modules/settings/container/SettingsContainer";
import ProtectedRoute from "@/shared/components/wrappers/ProtectedRoute";
import AuthenticatedLayout from "@/shared/layouts/AuthenticatedLayout";
import { NextApplicationPage } from "@/shared/typedefs";

const SettingsPage: NextApplicationPage = () => <SettingsContainer />;

SettingsPage.Layout = AuthenticatedLayout;
SettingsPage.Guard = ProtectedRoute;

export default SettingsPage;
