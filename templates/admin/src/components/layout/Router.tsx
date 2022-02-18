import React from 'react';
import {
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { getGlobalInstance } from 'plume-ts-di';
import LogApi from '../../lib/plume-admin-log-api/pages/LogApi';
import Home from '../pages/Home';
import Users from '../../lib/plume-admin-users/pages/Users';
import PermissionRoute from '../theme/routes/PermissionRoute';
import Permission from '../../services/session/Permission';
import { HOME, LOG_API, USERS } from '../Routes';

export default function Router() {
  const users = getGlobalInstance(Users);
  const logApi = getGlobalInstance(LogApi);

  return (
    <Switch>
      <PermissionRoute permission={Permission.MANAGE_USERS} path={USERS}>
        <users.render />
      </PermissionRoute>
      <PermissionRoute permission={Permission.MANAGE_API_LOGS} path={LOG_API}>
        <logApi.render />
      </PermissionRoute>
      <Route path={HOME}>
        <Home />
      </Route>
      <Route path="*">
        <Redirect to={{ pathname: HOME }} />
      </Route>
    </Switch>
  );
}
