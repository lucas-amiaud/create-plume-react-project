import { getGlobalInstance } from 'plume-ts-di';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import MessageService from '../../../i18n/messages/MessageService';
import { SortElementProps } from '../../plume-admin-theme/list/ListProps';
import PlumeAdminTheme from '../../plume-admin-theme/PlumeAdminTheme';
import { rawIncludes } from '../../../components/theme/utils/FilterUtils';
import useLoader from '../../plume-http-react-hook-loader/promiseLoaderHook';
import { useOnComponentMounted } from '../../react-hooks-alias/ReactHooksAlias';
import LogApiApi from '../api/LogApiApi';
import { LogApiFilters, LogApiTrimmed } from '../api/LogApiTypes';
import logsApiSortsList, { DATE_DESC } from '../pages/LogsApiSort';

type Props = {
  logApiPath: string,
}

function LogApiList({ logApiPath }: Props) {
  const messages = getGlobalInstance(MessageService).t();
  const theme = getGlobalInstance(PlumeAdminTheme);
  const logApiApi = getGlobalInstance(LogApiApi);
  const history = useHistory();

  const [logsApi, setLogsApi] = useState<LogApiTrimmed[]>();
  const logsApiLoader = useLoader();
  const fetchLogsApi = () => logsApiLoader.monitor(
    logApiApi
      .fetchAll({})
      .then(setLogsApi)
  );

  // search bar
  const [currentSearchBarFilter, setCurrentSearchBarFilter] = useState<string>();

  // sorting
  const [currentLogsApiSorting, setCurrentLogsApiSorting] = useState<SortElementProps>(DATE_DESC);

  // filters
  const [logsApiFilters, setLogsApiFilters] = useState<LogApiFilters>();
  const logApiFiltersLoader = useLoader();
  const fetchFilters = () => logApiFiltersLoader.monitor(
    logApiApi.fetchLogApiFilters()
      .then(setLogsApiFilters)
  );

  useOnComponentMounted(() => {
    fetchLogsApi();
    fetchFilters();
  });

  const applySearchBarFilter = (logApi: LogApiTrimmed) => {
    if (!currentSearchBarFilter || currentSearchBarFilter === '') {
      return true;
    }
    return rawIncludes(logApi.url, currentSearchBarFilter);
  }

  const sortedList = () => {
    return logsApi?.sort(currentLogsApiSorting.sortFunction).filter(applySearchBarFilter) || [];
  }

  return (
    <>
      <theme.pageTitle>{messages.logs_api.title_list}</theme.pageTitle>
      <theme.pageBloc>
        <theme.pageBlocColumn column="50">
          <theme.listSearchBar
            onSearch={(event: React.ChangeEvent<HTMLInputElement>) => {
              setCurrentSearchBarFilter(event.target.value);
            }}
          />
        </theme.pageBlocColumn>
      </theme.pageBloc>
      <theme.pageBloc>
        <theme.pageBlocColumn column="80">
          <theme.listHeader
            listLength={logsApi?.length || 0}
            sortConfiguration={{
              sortedObjectKey: 'logs_api',
              sortPossibilities: logsApiSortsList(),
              defaultSortPossibility: DATE_DESC,
              onSort: (sortElement: SortElementProps) => {
                setCurrentLogsApiSorting(sortElement);
              },
            }}
          />
          <theme.listElements isLoading={logsApiLoader.isLoading} listLength={logsApi?.length || 0}>
            {
              React.Children.toArray(
                sortedList().map((logApi: LogApiTrimmed) => (
                    <div
                      onClick={() => {
                        history.push(`${logApiPath}/${logApi.id}`)
                      }}
                    >
                      {logApi.url}
                    </div>
                  )
                )
              )
            }
          </theme.listElements>
        </theme.pageBlocColumn>
      </theme.pageBloc>
    </>
  );
}

export default (LogApiList);
