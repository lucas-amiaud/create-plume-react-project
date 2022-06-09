import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import PlumeAdminTheme from '../../plume-admin-theme/PlumeAdminTheme';
import LogApiList from '../components/LogApiList';
import LogApiDetails from './LogApiDetails';

class LogApi {
  constructor(
    private readonly theme: PlumeAdminTheme,
  ) {
  }

  render = () => {
    const { path } = useRouteMatch();

    return (
      <this.theme.panel>
        <LogApiList
          logApiPath={path}
        />
        <Switch>
          <Route path={`${path}/:logApiId`}>
            <LogApiDetails
              logApiPath={path}
            />
          </Route>
        </Switch>
      </this.theme.panel>
    );
  };
}

export default (LogApi);
