import { useMemo } from "react";

import { useAuth } from "@/shared/providers/AuthProvider";
import { useCheckPermissionsQuery } from "@/shared/redux/rtk-apis/permissions/permissions.api";
import { EPermission } from "@/shared/typedefs";

export const useHasPermission = (permissions: Record<string, EPermission[]>) => {
  const { hasPermission, isLoading } = useAuthorizationGuard({ permissions });

  return { hasPermission, isLoading };
};

export const useAuthorizationGuard = ({
  permissions,
}: {
  permissions: Record<string, EPermission[]>;
}) => {
  const { activeOrganizationRole } = useAuth();

  const shouldSkip = !activeOrganizationRole;

  const { data, isLoading, isFetching } = useCheckPermissionsQuery(
    { permissions },
    {
      skip: shouldSkip,
      refetchOnMountOrArgChange: true,
      refetchOnFocus: true,
    },
  );

  const hasPermission = useMemo(() => {
    if (shouldSkip) {
      return false;
    }
    return data?.hasPermission ?? null;
  }, [data?.hasPermission, shouldSkip]);

  return {
    hasPermission,
    isLoading: isLoading || isFetching,
  };
};
