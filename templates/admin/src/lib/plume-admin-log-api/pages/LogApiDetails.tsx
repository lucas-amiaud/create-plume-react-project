import dayjs from 'dayjs';
import { getGlobalInstance } from 'plume-ts-di';
import React, { FormEvent, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { NavigateFunction, useNavigate, useParams } from 'react-router-dom';
import useMessages from '../../../i18n/hooks/messagesHook';
import PlumeAdminTheme from '../../plume-admin-theme/PlumeAdminTheme';
import useLoader, {
  LoaderState,
} from '../../plume-http-react-hook-loader/promiseLoaderHook';
import { useOnComponentMounted } from '../../react-hooks-alias/ReactHooksAlias';
import LogApiApi from '../api/LogApiApi';
import { LogApiDetailsType } from '../api/LogApiTypes';

type Props = {
  logApiPath: string,
};

type LogApiRouteParams = {
  logApiId: string,
};

function LogApiDetails({ logApiPath }: Props) {
  const logApiApi: LogApiApi = getGlobalInstance(LogApiApi);
  const theme: PlumeAdminTheme = getGlobalInstance(PlumeAdminTheme);
  const { messages } = useMessages();

  const navigate: NavigateFunction = useNavigate();
  const logApiLoader: LoaderState = useLoader();
  const { logApiId } = useParams<LogApiRouteParams>();

  const [logApiDetail, setLogApiDetail] = useState<LogApiDetailsType>();

  const fetchLogById = () => {
    logApiLoader.monitor(
      logApiApi.fetchById(logApiId!)
        .then(setLogApiDetail),
    );
  };

  useOnComponentMounted(() => {
    fetchLogById();
  });

  const {
    control,
    reset,
  } = useForm<LogApiDetailsType>();

  useEffect(() => {
    reset(logApiDetail);
  }, [logApiDetail]);

  return (
    <theme.uncontrolledDrawer
      title={messages.logs_api.title_detail(logApiDetail?.api ?? ' ... ')}
      onClose={() => {
        navigate(logApiPath);
      }}
    >
      {
        logApiLoader.isLoading
        && (
          <div>
            Loading
          </div>
        )
      }
      {
        logApiLoader.isLoaded
        && logApiDetail
        && (
          <theme.pageBloc>
            <form onSubmit={(e :FormEvent<HTMLFormElement>) => e.preventDefault()}>
              <input type="hidden" name="id" value={logApiDetail.id} />
              <theme.formField
                inputId="api"
              >
                <theme.inputText
                  control={control}
                  label={messages.logs_api.api}
                  id="api"
                  readonly
                />
              </theme.formField>
              <theme.formField
                inputId="url"
              >
                <theme.inputText
                  label={messages.logs_api.url}
                  id="url"
                  control={control}
                  readonly
                />
              </theme.formField>
              <theme.formField
                inputId="method"
              >
                <theme.inputText
                  control={control}
                  id="method"
                  label={messages.logs_api.method}
                  readonly
                />
              </theme.formField>
              <theme.formField
                inputId="statusCode"
              >
                <theme.inputText
                  label={messages.logs_api.status_code}
                  control={control}
                  id="statusCode"
                  readonly
                />
              </theme.formField>
              <theme.formField
                inputId="bodyRequest"
              >
                <theme.inputText
                  label={messages.logs_api.status_code}
                  control={control}
                  id="bodyRequest"
                  multiline
                  readonly
                />
              </theme.formField>
              <theme.formField
                inputId="bodyResponse"
              >
                <theme.inputText
                  label={messages.logs_api.status_code}
                  control={control}
                  id="bodyResponse"
                  multiline
                  readonly
                />
              </theme.formField>
              <theme.panelSeparator />
              <theme.formField>
                <theme.inputText
                  control={control}
                  label={messages.label.creation_date}
                  readonly
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
