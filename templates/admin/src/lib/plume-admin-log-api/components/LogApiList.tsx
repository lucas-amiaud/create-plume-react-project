import { getGlobalInstance } from 'plume-ts-di';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import MessageService from '../../../i18n/messages/MessageService';
import { RawFilterProps } from '../../plume-admin-theme/list/ListProps';
import PlumeAdminTheme from '../../plume-admin-theme/PlumeAdminTheme';
import useLoader from '../../plume-http-react-hook-loader/promiseLoaderHook';
import { useOnComponentMounted } from '../../react-hooks-alias/ReactHooksAlias';
import LogApiApi from '../api/LogApiApi';
import { LogApiFilters, LogApiTrimmed } from '../api/LogApiTypes';

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

  // filters
  const [logsApiFilters, setLogsApiFilters] = useState<LogApiFilters>();
  const [currentLogsApiFilters, setCurrentLogsApiFilters] = useState<Map<string, string[]>>(new Map<string, string[]>());
  const logApiFiltersLoader = useLoader();
  const fetchFilters = () => logApiFiltersLoader.monitor(
    logApiApi.fetchLogApiFilters()
      .then(setLogsApiFilters)
  );

  const filters = (): RawFilterProps[] => {
    const apiNamesFilters: RawFilterProps = {
      filterKey: 'api_names',
      possibleValues: logsApiFilters?.apiNames || [],
    };
    const statusCodeFilters: RawFilterProps = {
      filterKey: 'status_code',
      possibleValues: logsApiFilters?.statusCodes.map(code => code.toString()) || [],
    };
    return [apiNamesFilters, statusCodeFilters];
  }

  useOnComponentMounted(() => {
    fetchLogsApi();
    fetchFilters();
  });

  return (
    <>
      <theme.pageBloc>
        <theme.pageBlocColumn column="20">
          <theme.listFilters
            filterMenuKey="logs-api"
            filters={filters()}
            onFilterValueClicked={() => {
            }}
            selectedValues={currentLogsApiFilters}
          />
        </theme.pageBlocColumn>
        <theme.pageBlocColumn column="80">
          {/*<theme.listHeader
            listLength={logsApi?.length || 0}
            sortConfiguration={{}}
          />*/}
          <theme.listElements isLoading={logsApiLoader.isLoading} listLength={logsApi?.length || 0}>
            {
              React.Children.toArray(
                logsApi?.map((logApi: LogApiTrimmed) => (
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
