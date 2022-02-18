// eslint-disable-next-line @typescript-eslint/no-unused-vars
import 'micro-observables/batchingForReactDom';
import { configureGlobalInjector, Injector } from 'plume-ts-di';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { Logger } from 'simple-logging-system';
import installApiModule from './api/api-module';
import App from './components/App';
import installComponentsModule from './components/components-module';
import installI18nModule from './i18n/i18n-module';
import installPlumeAdminLogApiModule from './lib/plume-admin-log-api/plume-admin-log-api-module';
import installPlumeAdminUsersModule from './lib/plume-admin-users/plume-admin-users-module';
import './polyfill-loader';
import installServicesModule from './services/services-module';
import SessionService from './services/session/SessionService';

const currentMillis = Date.now();
const logger = new Logger('index');

const injector = new Injector();
installServicesModule(injector);
installComponentsModule(injector);
installApiModule(injector);
installI18nModule(injector);
installPlumeAdminUsersModule(injector);
installPlumeAdminLogApiModule(injector);

injector.initializeSingletonInstances();

configureGlobalInjector(injector);

injector.getInstance(SessionService).tryInitializingSessionFromStorage();

const app = injector.getInstance(App);
const reactApp = (
  <React.StrictMode>
    <Router basename="/admin">
      <app.render />
    </Router>
  </React.StrictMode>
);
const domElement = document.getElementById('root');

ReactDOM.render(reactApp, domElement);

logger.info(`Application started in ${Date.now() - currentMillis}ms`);
