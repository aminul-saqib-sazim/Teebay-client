import AuthGuard from "@/shared/components/wrappers/AuthGuard";
import AuthenticatedLayout from "@/shared/layouts/AuthenticatedLayout";
import { NextApplicationPage } from "@/shared/typedefs";

const DashboardPage: NextApplicationPage = () => {
  return <div>Dashboard Page</div>;
};

DashboardPage.Layout = AuthenticatedLayout;
DashboardPage.Guard = AuthGuard;

export default DashboardPage;
