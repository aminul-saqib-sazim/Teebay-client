import UsersContainer from "@/modules/users/containers/UsersContainer";
import { withAllowedRoles } from "@/shared/components/hocs/withAllowedRoles";
import AuthGuard from "@/shared/components/wrappers/AuthGuard";
import AuthenticatedLayout from "@/shared/layouts/AuthenticatedLayout";
import { NextApplicationPage } from "@/shared/typedefs";
import { EUserRole } from "@/shared/typedefs/api";

const UsersAdministrationPage: NextApplicationPage = () => <UsersContainer />;

UsersAdministrationPage.Layout = AuthenticatedLayout;
UsersAdministrationPage.Guard = withAllowedRoles(AuthGuard, [EUserRole.SUPER_USER]);

export default UsersAdministrationPage;
