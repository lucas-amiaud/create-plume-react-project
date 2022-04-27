import { getGlobalInstance } from 'plume-ts-di';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import ListSingleChoiceFilters from '../../../components/theme/list/ListSingleChoiceFilters';
import MessageService from '../../../i18n/messages/MessageService';
import { SortElementProps } from '../../plume-admin-theme/list/ListProps';
import PlumeAdminTheme from '../../plume-admin-theme/PlumeAdminTheme';
import { checkValueForFilter, rawIncludes } from '../../../components/theme/utils/FilterUtils';
import userFilters from '../../plume-admin-users/pages/UserFilter';
import useLoader from '../../plume-http-react-hook-loader/promiseLoaderHook';
import { useOnComponentMounted } from '../../react-hooks-alias/ReactHooksAlias';
import LogApiApi from '../api/LogApiApi';
import { LogApiFilters, LogApiParams, LogApiTrimmed } from '../api/LogApiTypes';
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
  const fetchLogsApi = (apiParam: LogApiParams) => logsApiLoader.monitor(
    logApiApi
      .fetchAll(apiParam)
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
    fetchLogsApi({});
    fetchFilters();
  });

  const applySearchBarFilter = (logApi: LogApiTrimmed) => {
    if (!currentSearchBarFilter || currentSearchBarFilter === '') {
      return true;
    }
    return rawIncludes(logApi.url, currentSearchBarFilter);
  }

  const applyCheckboxesFilters = (newFilters: Map<string, string>) => {
    setSelectedLogsApiFilters(newFilters);
    fetchLogsApi({
      method: selectedLogsApiFilters.get('method'),
      statusCode: selectedLogsApiFilters.get('status_code'),
      apiName: selectedLogsApiFilters.get('api_name'),
    });
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
        <theme.pageBlocColumn column="20">
          <ListSingleChoiceFilters
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
                  'PUT'
                ]
              }
            ]}
            onFilterValueClicked={(filterElementKey: string, valueSelected: string) => {
              const clone: Map<string, string> = selectedLogsApiFilters;
              clone.set(filterElementKey, valueSelected);
              applyCheckboxesFilters(clone);
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
