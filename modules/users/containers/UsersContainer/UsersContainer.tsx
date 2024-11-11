import React, { useState } from "react";

import { useRouter } from "next/router";

import { ColumnDef } from "@tanstack/react-table";
import { MoreVertical } from "lucide-react";

import FullPageLoadingSpinner from "@/shared/components/FullPageLoadingSpinner";
import { Button } from "@/shared/components/shadui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/components/shadui/dropdown-menu";
import { ScrollArea, ScrollBar } from "@/shared/components/shadui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/shadui/select";
import TableCheckBox from "@/shared/components/Table/TableCheckbox";
import TablePagination from "@/shared/components/Table/TablePagination";
import { useGetAllRolesQuery } from "@/shared/redux/rtk-apis/roles/roles.api";
import { useGetUsersQuery } from "@/shared/redux/rtk-apis/users/users.api";
import { EUserState, ISuperuserUserResponse } from "@/shared/typedefs/api";

import ChangeUserRoleDialog from "../../components/ChangeUserRoleDialog";
import CreateUserDialog from "../../components/CreateUserDialog";
import ToggleUserStateDialog from "../../components/ToggleUserStateDialog";
import UsersTable from "../../components/UsersTable";
import { PAGINATION_LIMIT_OPTIONS } from "./UsersContainer.constants";

const UsersContainer = () => {
  const router = useRouter();
  const { page = 1, limit = 10, userState = undefined } = router.query;
  const { data: users, isLoading: isUsersLoading } = useGetUsersQuery({
    limit: limit as number,
    page: page as number,
    state: userState as EUserState | undefined,
  });
  const { data: roles, isLoading: isRolesLoading } = useGetAllRolesQuery();

  const [selectedUser, setSelectedUser] = useState<ISuperuserUserResponse | null>(null);
  const [isChangeRoleDialogOpen, setIsChangeRoleDialogOpen] = useState(false);
  const [isToggleStateDialogOpen, setIsToggleStateDialogOpen] = useState(false);
  const [isCreateUserDialogOpen, setIsCreateUserDialogOpen] = useState(false);

  const handleLimitChange = (value: string) => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, limit: value, page: 1 },
    });
  };

  const handleUserStateChange = (value: string) => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, userState: value, page: 1 },
    });
  };

  const usersTableColumns: ColumnDef<ISuperuserUserResponse>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <TableCheckBox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <TableCheckBox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "id",
      header: "ID",
      cell: ({ row }) => row.original.id,
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => row.original.email,
    },
    {
      accessorKey: "firstName",
      header: "First Name",
      cell: ({ row }) => row.original.userProfile.firstName,
    },
    {
      accessorKey: "lastName",
      header: "Last Name",
      cell: ({ row }) => row.original.userProfile.lastName,
    },
    {
      accessorKey: "role",
      header: "Role",
      cell: ({ row }) => row.original.userProfile.role.name,
    },
    {
      accessorKey: "state",
      header: "State",
      cell: ({ row }) => row.original.state,
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => {
                setSelectedUser(row.original);
                setIsChangeRoleDialogOpen(true);
              }}
            >
              Change User Role
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                setSelectedUser(row.original);
                setIsToggleStateDialogOpen(true);
              }}
            >
              {row.original.state === EUserState.ACTIVE ? "Deactivate" : "Activate"}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  if (isUsersLoading || isRolesLoading) {
    return <FullPageLoadingSpinner />;
  }

  if (!users || !roles) {
    return null;
  }

  return (
    <div className="container py-4">
      <CreateUserDialog
        isOpen={isCreateUserDialogOpen}
        onOpenChange={setIsCreateUserDialogOpen}
        roles={roles}
      />
      <ChangeUserRoleDialog
        user={selectedUser}
        isOpen={isChangeRoleDialogOpen}
        onOpenChange={setIsChangeRoleDialogOpen}
        roles={roles}
        onCancel={() => setSelectedUser(null)}
      />
      <ToggleUserStateDialog
        user={selectedUser}
        isOpen={isToggleStateDialogOpen}
        onOpenChange={setIsToggleStateDialogOpen}
        onCancel={() => setSelectedUser(null)}
      />

      <div className="flex flex-row items-center justify-between">
        <h3 className="text text-primary text-4xl font-bold">Users</h3>
        <div className="flex flex-row justify-end gap-4 w-full">
          <Button onClick={() => setIsCreateUserDialogOpen(true)}>Add User</Button>
          <Select value={userState?.toString()} onValueChange={handleUserStateChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem key={EUserState.ACTIVE} value={EUserState.ACTIVE.toString()}>
                {EUserState.ACTIVE}
              </SelectItem>
              <SelectItem key={EUserState.INACTIVE} value={EUserState.INACTIVE.toString()}>
                {EUserState.INACTIVE}
              </SelectItem>
            </SelectContent>
          </Select>

          <Select value={limit.toString()} onValueChange={handleLimitChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select rows per page" />
            </SelectTrigger>
            <SelectContent>
              {PAGINATION_LIMIT_OPTIONS.map((value) => (
                <SelectItem key={value} value={value.toString()}>
                  {value} rows
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <ScrollArea className="mt-4">
        <UsersTable data={users.data} columns={usersTableColumns} />

        <TablePagination paginationMetadata={users.meta} />

        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};

export default UsersContainer;
