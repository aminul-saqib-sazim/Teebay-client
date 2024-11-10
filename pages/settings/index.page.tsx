import SettingsContainer from "@/modules/settings/container/SettingsContainer";
import AuthGuard from "@/shared/components/wrappers/AuthGuard";
import AuthenticatedLayout from "@/shared/layouts/AuthenticatedLayout";
import { NextApplicationPage } from "@/shared/typedefs";

const SettingsPage: NextApplicationPage = () => <SettingsContainer />;

SettingsPage.Layout = AuthenticatedLayout;
SettingsPage.Guard = AuthGuard;

export default SettingsPage;
