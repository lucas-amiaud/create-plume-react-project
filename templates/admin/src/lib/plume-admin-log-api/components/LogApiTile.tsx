import dayjs from 'dayjs';
import { getGlobalInstance } from 'plume-ts-di';
import React from 'react';
import Status from '../../plume-admin-theme/layout/Status';
import PlumeAdminTheme from '../../plume-admin-theme/PlumeAdminTheme';
import { LogApiTrimmed } from '../api/LogApiTypes';

type Props = {
  logApi: LogApiTrimmed,
  onClick: () => void,
}
export default function LogApiTile({ logApi, onClick }: Props) {
  const theme = getGlobalInstance(PlumeAdminTheme);

  const logApiStatus = (): Status => {
    if (logApi.statusCode >= 400) {
      return Status.DANGER;
    }
    if (logApi.statusCode >= 300) {
      return Status.WARN;
    }
    return Status.OK;
  }

  return (
    <theme.listSingleElement
      cssClasses={`log-api-tile log-api-tile--${logApiStatus()}`}
      onSelectElement={onClick}
    >
      <div className="log-api-data">
        <div className="data data--small">
          <theme.statusDot status={logApiStatus()} />
        </div>
        <div className="data">
          <span className="value value--little">{dayjs(logApi.date).format('L LT')}</span>
        </div>
        <div className="data">
          <span>{logApi.method}</span>
        </div>
        <div className="data">
          <span>{logApi.api}</span>
        </div>
        <div className="data data--large">
          <span>{logApi.url}</span>
        </div>
        <div className="data data--small">
          <span>{logApi.statusCode}</span>
        </div>
      </div>
    </theme.listSingleElement>
  )
}