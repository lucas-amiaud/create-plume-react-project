import { getGlobalInstance } from 'plume-ts-di';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LogApi from '../../lib/plume-admin-log-api/pages/LogApi';
import Users from '../../lib/plume-admin-users/pages/Users';
import Permission from '../../services/session/Permission';
import Home from '../features/Home';
import { HOME, LOG_API, USERS } from '../Routes';
import PermissionRoute from '../theme/routes/PermissionRoute';

export default function Router() {
  const users: Users = getGlobalInstance(Users);
  const logApi: LogApi = getGlobalInstance(LogApi);

  return (
    <Routes>
      <Route
        path={`${USERS}/*`}
        element={
          <PermissionRoute permission={Permission.MANAGE_USERS}>
            <users.render />
          </PermissionRoute>
      }
      />
      <Route
        path={`${LOG_API}/*`}
        element={
          <PermissionRoute permission={Permission.MANAGE_API_LOGS}>
            <logApi.render />
          </PermissionRoute>
      }
      />
      <Route path={HOME} element={<Home />} />
    </Routes>
  );
}
