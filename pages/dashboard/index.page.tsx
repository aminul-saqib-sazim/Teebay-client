import dynamic from "next/dynamic";

import LoadingSpinner from "@/shared/components/LoadingSpinner";
import ProtectedRoute from "@/shared/components/wrappers/ProtectedRoute";
import AuthenticatedLayout from "@/shared/layouts/AuthenticatedLayout";
import { useAuth } from "@/shared/providers/AuthProvider";
import { EUserRole } from "@/shared/redux/rtk-apis/roles/roles.enums";
import { NextApplicationPage } from "@/shared/typedefs";

const DashboardContainer = dynamic(
  () => import("@/modules/dashboard/containers/DashboardContainer"),
  {
    loading: () => <LoadingSpinner />,
  },
);

const SuperuserDashboardContainer = dynamic(
  () => import("@/modules/dashboard/containers/SuperuserDashboardContainer"),
  {
    loading: () => <LoadingSpinner />,
  },
);

const DashboardPage: NextApplicationPage = () => {
  const { user, activeOrganizationRole } = useAuth();

  if (!user) {
    return null;
  }

  switch (activeOrganizationRole) {
    case EUserRole.OWNER:
      return <SuperuserDashboardContainer />;
    case EUserRole.ADMIN:
    case EUserRole.MEMBER:
      return <DashboardContainer />;
    default:
      return <DashboardContainer />;
  }
};

DashboardPage.Layout = AuthenticatedLayout;
DashboardPage.Guard = ProtectedRoute;

export default DashboardPage;
