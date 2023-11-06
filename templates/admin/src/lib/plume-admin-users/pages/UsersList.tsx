import { ColumnHelper, createColumnHelper } from '@tanstack/react-table';
import dayjs from 'dayjs';
import { getGlobalInstance } from 'plume-ts-di';
import React from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import {
  filterListContains,
} from '../../../components/theme/table/filter/SearchFilters';
import usePlumeTable, {
  PlumeTable,
} from '../../../components/theme/table/PlumeTableHook';
import useMessages from '../../../i18n/hooks/messagesHook';
import ActionStyle from '../../plume-admin-theme/action/ActionStyle';
import PlumeAdminTheme from '../../plume-admin-theme/PlumeAdminTheme';
import { AdminUserDetails } from '../api/AdminUserTypes';
import UsersListResults from '../components/UsersListResults';
import UserService from '../service/UserService';
import {
  AdminUsersWithIndexedRolesType,
} from './AdminUsersWithIndexedRolesType';

type Props = {
  usersWithRoles?: AdminUsersWithIndexedRolesType,
  usersPath: string,
  isUsersLoading: boolean,
};

export default function UsersList({
  usersWithRoles,
  usersPath,
  isUsersLoading,
}: Props) {
  const { messages } = useMessages();
  const theme: PlumeAdminTheme = getGlobalInstance(PlumeAdminTheme);
  const navigate: NavigateFunction = useNavigate();

  const columnHelper: ColumnHelper<AdminUserDetails> = createColumnHelper<AdminUserDetails>();
  const { table, tableActions }: PlumeTable<AdminUserDetails> = usePlumeTable<AdminUserDetails>(
    {
      messageKey: 'user',
      columns: [
        columnHelper.accessor(
          (row: AdminUserDetails) => UserService.userTrigram(row.firstName, row.lastName),
          {
            id: 'initials',
            enableColumnFilter: false,
            enableSorting: false,
          },
        ),
        columnHelper.accessor(
          (row: AdminUserDetails) => usersWithRoles?.roles.get(row.idRole),
          {
            id: 'role',
            filterFn: filterListContains,
          },
        ),
        columnHelper.accessor(
          (row: AdminUserDetails) => row.firstName,
          {
            id: 'firstName',
            sortingFn: 'text',
            enableColumnFilter: false,
          },
        ),
        columnHelper.accessor(
          (row: AdminUserDetails) => row.lastName,
          {
            id: 'lastName',
            sortingFn: 'text',
            filterFn: filterListContains,
          },
        ),
        columnHelper.accessor(
          (row: AdminUserDetails) => row.email,
          {
            id: 'email',
            enableColumnFilter: false,
          },
        ),
        columnHelper.accessor(
          (row: AdminUserDetails) => dayjs(row.creationDate).format('L LT'),
          {
            id: 'creationDate',
            sortingFn: 'datetime',
            enableColumnFilter: false,
          },
        ),
      ],
      data: usersWithRoles?.users ?? [],
      options: {
        defaultSort: { id: 'firstName', desc: false }
      }
    },
  );

  return (
    <>
      <theme.pageTitle>{messages.user.title_list}</theme.pageTitle>
      <theme.pageBloc>
        <theme.pageBlocColumn columnWidth="50">
          <theme.searchBar
            onSearch={(event: React.ChangeEvent<HTMLInputElement>) => {
              tableActions.onGlobalFilterChange(event.target.value);
            }}
          />
        </theme.pageBlocColumn>
        <theme.pageBlocColumn columnWidth="50">
          <theme.actionsContainer>
            <theme.actionButton
              icon="add"
              style={ActionStyle.PRIMARY}
              onClick={() => {
                navigate(`${usersPath}/create`);
              }}
            >
              {messages.user.add}
            </theme.actionButton>
          </theme.actionsContainer>
        </theme.pageBlocColumn>
      </theme.pageBloc>
      <theme.pageBloc>
        <theme.pageBlocColumn columnWidth="20">
          <theme.multipleChoiceFilterMenu
            messageKey={tableActions.filterConfiguration.messageKey}
            filters={tableActions.filterConfiguration.filters}
            onFilterValueClicked={tableActions.filterConfiguration.onFilterValueClicked}
            selectedValues={tableActions.filterConfiguration.selectedValues}
          />
        </theme.pageBlocColumn>
        <theme.pageBlocColumn columnWidth="80">
          <UsersListResults
            userList={table.getRowModel().rows}
            usersPath={usersPath}
            sortConfiguration={tableActions.sortConfiguration}
            isLoading={isUsersLoading}
          />
        </theme.pageBlocColumn>
      </theme.pageBloc>
    </>
  );
}
