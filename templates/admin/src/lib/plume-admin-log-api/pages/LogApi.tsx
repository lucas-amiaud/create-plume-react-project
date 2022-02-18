import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import LogApiApi from '../api/LogApiApi';
import LogApiDetails from './LogApiDetails';
import LogApiList from '../components/LogApiList';

class LogApi {
  constructor(
    private readonly logApiApi: LogApiApi,
    private readonly logApiDetails: LogApiDetails,
    ) {
  }

  render = () => {
    const { path } = useRouteMatch();

    return (
      <div className="admin-page">
        <LogApiList
          logApiPath={path}
          usersWithRoles={usersWithRoles}
          isUsersLoading={userLoader.isLoading}
        />
        <Switch>
          <Route path={`${path}/:userId`}>
            <this.logApiDetails.render
              logApiPath={path}
            />
          </Route>
        </Switch>
      </div>
    )
  }
}

export default (LogApi);
