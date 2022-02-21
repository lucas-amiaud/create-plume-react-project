import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import LogApiList from '../components/LogApiList';
import LogApiDetails from './LogApiDetails';

class LogApi {
  constructor(
    private readonly logApiDetails: LogApiDetails,
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
