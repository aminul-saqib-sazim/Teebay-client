import React, { useState } from "react";

import { ColumnDef } from "@tanstack/react-table";
import { MoreVertical } from "lucide-react";
import { useQueryStates, parseAsInteger, parseAsStringEnum } from "nuqs";

import FullPageLoadingSpinner from "@/shared/components/FullPageLoadingSpinner";
import { Button } from "@/shared/components/shadui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
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
import { useGetRolesQuery } from "@/shared/redux/rtk-apis/roles/roles.api";
import { useGetUsersQuery } from "@/shared/redux/rtk-apis/users/users.api";
import { IUserResponse } from "@/shared/redux/rtk-apis/users/users.interfaces";
import { EUserState } from "@/shared/typedefs/api";

import ChangeUserRoleDialog from "../../components/ChangeUserRoleDialog";
import { InviteUserDialog } from "../../components/CreateUserDialog";
import ToggleUserStateDialog from "../../components/ToggleUserStateDialog";
import UsersTable from "../../components/UsersTable";
import { PAGINATION_LIMIT_OPTIONS } from "./UsersContainer.constants";

const UsersContainer = () => {
  const [{ page, limit, userState }, setQueryStates] = useQueryStates({
    page: parseAsInteger.withDefault(1),
    limit: parseAsInteger.withDefault(10),
    userState: parseAsStringEnum<EUserState>(Object.values(EUserState)),
  });
  const { data: users, isLoading: isUsersLoading } = useGetUsersQuery({
    limit,
    page,
    state: userState ?? undefined,
  });
  const { data: roles = [] } = useGetRolesQuery();

  const [isInviteUserDialogOpen, setIsInviteUserDialogOpen] = useState(false);
  const [isToggleStateDialogOpen, setIsToggleStateDialogOpen] = useState(false);
  const [isChangeRoleDialogOpen, setIsChangeRoleDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<IUserResponse | null>(null);

  const handleToggleStateClick = (user: IUserResponse) => {
    setSelectedUser(user);
    setIsToggleStateDialogOpen(true);
  };

  const handleChangeRoleClick = (user: IUserResponse) => {
    setSelectedUser(user);
    setIsChangeRoleDialogOpen(true);
  };

  const handleDialogClose = () => {
    setSelectedUser(null);
  };

  const usersTableColumns: ColumnDef<IUserResponse>[] = [
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
      cell: ({ row }) => row.original.firstName,
    },
    {
      accessorKey: "lastName",
      header: "Last Name",
      cell: ({ row }) => row.original.lastName,
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
          <DropdownMenuTrigger>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleChangeRoleClick(row.original)}>
              Change Role
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => handleToggleStateClick(row.original)}>
              {row.original.state === EUserState.ACTIVE ? "Deactivate" : "Activate"}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  if (isUsersLoading) {
    return <FullPageLoadingSpinner />;
  }

  if (!users) {
    return null;
  }

  return (
    <div className="container py-4">
      <InviteUserDialog isOpen={isInviteUserDialogOpen} onOpenChange={setIsInviteUserDialogOpen} />
      <ToggleUserStateDialog
        user={selectedUser}
        isOpen={isToggleStateDialogOpen}
        onOpenChange={setIsToggleStateDialogOpen}
        onCancel={handleDialogClose}
      />
      <ChangeUserRoleDialog
        user={selectedUser}
        isOpen={isChangeRoleDialogOpen}
        onOpenChange={setIsChangeRoleDialogOpen}
        roles={roles}
        onCancel={handleDialogClose}
      />

      <div className="flex flex-row items-center justify-between">
        <h3 className="text text-primary text-4xl font-bold">Users</h3>
        <div className="flex flex-row justify-end gap-4 w-full">
          <Button onClick={() => setIsInviteUserDialogOpen(true)}>Invite User</Button>
          <Select
            value={userState?.toString() ?? undefined}
            onValueChange={(value: string | null) => {
              setQueryStates({ userState: value as EUserState, page: 1 });
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem key={EUserState.ACTIVE} value={EUserState.ACTIVE}>
                Active
              </SelectItem>
              <SelectItem key={EUserState.INACTIVE} value={EUserState.INACTIVE}>
                Inactive
              </SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={limit.toString()}
            onValueChange={(value: string | null) => {
              setQueryStates({ limit: parseInt(value ?? "10"), page: 1 });
            }}
          >
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
