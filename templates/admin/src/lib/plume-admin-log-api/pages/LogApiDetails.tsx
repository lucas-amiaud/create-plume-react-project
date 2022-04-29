import dayjs from 'dayjs';
import { getGlobalInstance } from 'plume-ts-di';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';
import PlumeAdminTheme from '../../plume-admin-theme/PlumeAdminTheme';
import useLoader from '../../plume-http-react-hook-loader/promiseLoaderHook';
import PlumeMessageResolver from '../../plume-messages/MessageResolver';
import { useOnComponentMounted } from '../../react-hooks-alias/ReactHooksAlias';
import LogApiApi from '../api/LogApiApi';
import { LogApiDetailsType } from '../api/LogApiTypes';

type Props = {
  logApiPath: string,
}

type LogApiRouteParams = {
  logApiId: string,
};

function LogApiDetails({ logApiPath }: Props) {
  const logApiApi = getGlobalInstance(LogApiApi);
  const theme = getGlobalInstance(PlumeAdminTheme);
  const messages = getGlobalInstance(PlumeMessageResolver);

  const history = useHistory();
  const logApiLoader = useLoader();
  const { logApiId } = useParams<LogApiRouteParams>();

  const [logApiDetail, setLogApiDetail] = useState<LogApiDetailsType>();
  const fetchLogById = () => {
    logApiLoader.monitor(
      logApiApi.fetchById(logApiId)
        .then(setLogApiDetail)
    )
  };

  useOnComponentMounted(() => {
    fetchLogById();
  });

  const {
    control,
    reset
  } = useForm<LogApiDetailsType>();

  useEffect(() => {
    reset(logApiDetail);
  }, [logApiDetail])

  return (
    <theme.uncontrolledDrawer
      title={messages.t('logs_api.title_detail', logApiDetail?.api ?? ' ... ')}
      onClose={() => {
        history.push(logApiPath)
      }}
    >
      {
        logApiLoader.isLoading
        && (
          <div>
            Loding
          </div>
        )
      }
      {
        logApiLoader.isLoaded
        && logApiDetail
        && (
          <theme.pageBloc>
            <form onSubmit={console.log}>
              <input type="hidden" name="id" value={logApiDetail.id} />
              <theme.formField
                inputId="api"
              >
                <theme.inputText
                  control={control}
                  label={messages.t('logs_api.api')}
                  id="api"
                  disabled
                />
              </theme.formField>
              <theme.formField
                inputId="url"
              >
                <theme.inputText
                  label={messages.t('logs_api.url')}
                  id="url"
                  control={control}
                  disabled
                />
              </theme.formField>
              <theme.formField
                inputId="method"
              >
                <theme.inputText
                  control={control}
                  id="method"
                  label={messages.t('logs_api.method')}
                  disabled
                />
              </theme.formField>
              <theme.formField
                inputId="statusCode"
              >
                <theme.inputText
                  label={messages.t('logs_api.status_code')}
                  control={control}
                  id="statusCode"
                  disabled
                />
              </theme.formField>
              <theme.panelSeparator />
              <theme.formField>
                <theme.inputText
                  control={control}
                  label={messages.t('label.creation_date')}
                  disabled
                  defaultValue={dayjs(logApiDetail.date).format('L LT')}
                />
              </theme.formField>
            </form>
          </theme.pageBloc>
        )
      }
    </theme.uncontrolledDrawer>
  );
}

export default (LogApiDetails);
