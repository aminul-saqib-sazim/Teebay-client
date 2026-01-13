import UsersContainer from "@/modules/users/containers/UsersContainer";
import ProtectedRoute from "@/shared/components/wrappers/ProtectedRoute";
import AuthenticatedLayout from "@/shared/layouts/AuthenticatedLayout";
import { NextApplicationPage } from "@/shared/typedefs";

const UsersAdministrationPage: NextApplicationPage = () => <UsersContainer />;

UsersAdministrationPage.Layout = AuthenticatedLayout;
UsersAdministrationPage.Guard = ProtectedRoute;

export default UsersAdministrationPage;
