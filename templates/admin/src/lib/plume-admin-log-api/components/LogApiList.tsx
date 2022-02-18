import React, { useState } from 'react';
import { getGlobalInstance } from 'plume-ts-di';
import { useHistory } from 'react-router-dom';
import { LogApiTrimmed } from '../api/LogApiTypes';
import MessageService from '../../../i18n/messages/MessageService';
import PlumeAdminTheme from '../../plume-admin-theme/PlumeAdminTheme';
import userFilters from '../../plume-admin-users/pages/UserFilter';
import { FilterElementProps } from '../../plume-admin-theme/list/ListProps';
import { AdminUserDetails } from '../../plume-admin-users/api/AdminUserTypes';
import { handleFilterValue } from '../../plume-admin-users/utils/FilterUtils';

type Props = {
  logApiUrl: string,
}

function LogApiList({ logApiUrl }: Props) {
  const messages = getGlobalInstance(MessageService).t();
  const theme = getGlobalInstance(PlumeAdminTheme);
  const history = useHistory();

  const [logsApi, setLogsApi] = useState<LogApiTrimmed[]>();

  return (
    <>
      <theme.pageBloc>
        <theme.pageBlocColumn column="25">
          <theme.listFilterMenu
            filteredObjectKey="user"
            filterPossibilities={userFilters(usersWithRoles?.roles)}
            onFilter={(filterElement: FilterElementProps<AdminUserDetails>, value: string, isChecked: boolean) => {
              setCurrentUserFilters(handleFilterValue(filterElement, value, isChecked, currentUserFilters));
            }}
            activeFilters={currentUserFilters}
            rawList={usersWithRoles?.users}
          />
        </theme.pageBlocColumn>
        <theme.pageBlocColumn column="75">
          <theme.listHeader
            listLength={logsApi?.length || 0}
            sortConfiguration={sortConfiguration}
          />
          <theme.listElements isLoading={isLoading} listLength={userList.length}>
            {
              React.Children.toArray(
                userList.map((logApi: LogApiTrimmed) => (
                  <div
                    onClick={() => {
                      history.push(`${logApiUrl}/${logApi.id}`)
                    }}
                  >
                    {logApi.url}
                  </div>
                ))
              )
            }
          </theme.listElements>
        </theme.pageBlocColumn>
      </theme.pageBloc>
    </>
  );
}

export default (LogApiList);
