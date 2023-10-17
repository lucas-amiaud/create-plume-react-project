import React from 'react';
import { Route, Routes } from 'react-router-dom';
import PlumeAdminTheme from '../../plume-admin-theme/PlumeAdminTheme';
import LogApiList from '../components/LogApiList';
import LogApiDetails from './LogApiDetails';

class LogApi {
  constructor(
    private readonly theme: PlumeAdminTheme,
  ) {
  }

  render = () => {
    const logApiPath: string = '/log-api';

    return (
      <this.theme.panel>
        <LogApiList
          logApiPath={logApiPath}
        />
        <Routes>
          <Route
            path={`${logApiPath}/:logApiId`}
            element={
              <LogApiDetails
                logApiPath={logApiPath}
              />
            }
          />
        </Routes>
      </this.theme.panel>
    );
  };
}

export default (LogApi);
