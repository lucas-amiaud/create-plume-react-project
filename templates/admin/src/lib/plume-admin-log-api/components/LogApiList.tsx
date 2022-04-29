import { getGlobalInstance } from 'plume-ts-di';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { replaceValueForFilter } from '../../../components/theme/utils/FilterUtils';
import MessageService from '../../../i18n/messages/MessageService';
import { SortElementProps } from '../../plume-admin-theme/list/sort/SortProps';
import PlumeAdminTheme from '../../plume-admin-theme/PlumeAdminTheme';
import useLoader from '../../plume-http-react-hook-loader/promiseLoaderHook';
import { useOnComponentMounted } from '../../react-hooks-alias/ReactHooksAlias';
import LogApiApi from '../api/LogApiApi';
import { LogApiFilters, LogApiTrimmed } from '../api/LogApiTypes';
import logsApiSortsList, { DATE_DESC } from '../pages/LogsApiSort';
import LogApiTile from './LogApiTile';

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
      .fetchAll({
        method: selectedLogsApiFilters.get('method'),
        statusCode: selectedLogsApiFilters.get('status_code'),
        apiName: selectedLogsApiFilters.get('api_name'),
        url: currentSearchBarFilter,
      })
      .then(setLogsApi)
  );

  // search bar
  const [currentSearchBarFilter, setCurrentSearchBarFilter] = useState<string>();

  // sorting
  const [currentLogsApiSorting, setCurrentLogsApiSorting] = useState<SortElementProps>(DATE_DESC);

  // filters
  const [selectedLogsApiFilters, setSelectedLogsApiFilters] = useState<Map<string, string>>(new Map<string, string>());
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

  useEffect(() => {
    fetchLogsApi();
  }, [selectedLogsApiFilters, currentSearchBarFilter]);

  const applySearchBarFilter = (searchedText: string) => {
    setCurrentSearchBarFilter(searchedText);
  }

  const sortedList = () => {
    return logsApi?.sort(currentLogsApiSorting.sortFunction) || [];
  }

  return (
    <>
      <theme.pageTitle>{messages.logs_api.title_list}</theme.pageTitle>
      <theme.pageBloc>
        <theme.pageBlocColumn column="50">
          <theme.searchBar
            onSearch={(event: React.ChangeEvent<HTMLInputElement>) => {
              applySearchBarFilter(event.target.value);
            }}
          />
        </theme.pageBlocColumn>
      </theme.pageBloc>
      <theme.pageBloc>
        <theme.pageBlocColumn column="20">
          <theme.singleChoiceFilterMenu
            filterMenuKey="logs_api"
            filters={[
              {
                filterKey: 'api_name',
                possibleValues: logsApiFilters?.apiNames ?? []
              },
              {
                filterKey: 'status_code',
                possibleValues: logsApiFilters?.statusCodes?.map(status => status.toString()) ?? []
              },
              {
                filterKey: 'method',
                possibleValues: [
                  'GET',
                  'POST',
                  'PUT',
                  'PATCH',
                  'DELETE',
                ]
              }
            ]}
            onFilterValueClicked={(filterElementKey: string, valueSelected: string) => {
              setSelectedLogsApiFilters(replaceValueForFilter(filterElementKey, valueSelected, selectedLogsApiFilters));
            }}
            selectedValues={selectedLogsApiFilters}
          />
        </theme.pageBlocColumn>
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
                    <LogApiTile
                      logApi={logApi}
                      onClick={() => {
                        history.push(`${logApiPath}/${logApi.id}`)
                      }}
                    />
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
