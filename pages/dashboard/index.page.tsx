import dynamic from "next/dynamic";

import { withAllowedRoles } from "@/shared/components/hocs/withAllowedRoles";
import LoadingSpinner from "@/shared/components/LoadingSpinner";
import { useSessionContext } from "@/shared/components/wrappers/AppInitializer/AppInitializerContext";
import AuthGuard from "@/shared/components/wrappers/AuthGuard";
import AuthenticatedLayout from "@/shared/layouts/AuthenticatedLayout";
import { NextApplicationPage } from "@/shared/typedefs";
import { EUserRole } from "@/shared/typedefs/api";

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
  const { user } = useSessionContext();

  if (!user) {
    return null;
  }

  switch (user.claim) {
    case EUserRole.SUPER_USER:
      return <SuperuserDashboardContainer />;
    case EUserRole.ADMIN:
      return <DashboardContainer />;
    default:
      return null;
  }
};

DashboardPage.Layout = AuthenticatedLayout;
DashboardPage.Guard = withAllowedRoles(AuthGuard, [EUserRole.ADMIN, EUserRole.SUPER_USER]);

export default DashboardPage;
