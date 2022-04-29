import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import PlumeAdminTheme from '../../plume-admin-theme/PlumeAdminTheme';
import PlumeMessageResolver from '../../plume-messages/MessageResolver';
import LogApiList from '../components/LogApiList';
import LogApiDetails from './LogApiDetails';

class LogApi {
  constructor(
    private readonly theme: PlumeAdminTheme,
    private readonly messages: PlumeMessageResolver,
  ) {
  }

  render = () => {
    const { path } = useRouteMatch();

    return (
      <div className="admin-page">
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
      </div>
    )
  }
}

export default (LogApi);
