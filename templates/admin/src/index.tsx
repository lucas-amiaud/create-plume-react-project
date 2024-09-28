// eslint-disable-next-line @typescript-eslint/no-unused-vars
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import 'micro-observables/batchingForReactDom';
import { configureGlobalInjector, Injector } from 'plume-ts-di';
import React from 'react';
import { createRoot } from 'react-dom/client';
import 'react-toastify/dist/ReactToastify.css';
import { Logger } from 'simple-logging-system';
import installApiModule from './api/api-module';
import App from './components/App';
import installComponentsModule from './components/components-module';
import NotificationRenderer from './components/theme/NotificationRenderer';
import installI18nModule from './i18n/i18n-module';
import LocaleService from './i18n/locale/LocaleService';
import initializeLocalizedDate from './i18n/messages/LocalizedDate';
import installPlumeAdminLogApiModule
  from './lib/plume-admin-log-api/plume-admin-log-api-module';
import installPlumeAdminUsersModule
  from './lib/plume-admin-users/plume-admin-users-module';
import './polyfill-loader';
import installServicesModule from './services/services-module';
import SessionService from './services/session/SessionService';

const currentMillis: number = Date.now();
const logger: Logger = new Logger('index');

const injector: Injector = new Injector();
installServicesModule(injector);
installComponentsModule(injector);
installApiModule(injector);
installI18nModule(injector);
installPlumeAdminUsersModule(injector);
installPlumeAdminLogApiModule(injector);

injector.initializeSingletonInstances();

configureGlobalInjector(injector);

const sessionService: SessionService = injector.getInstance(SessionService);
sessionService.tryInitializingSessionFromStorage();
sessionService.synchronizeSessionFromOtherBrowserTags();

// dayjs
initializeLocalizedDate(injector.getInstance(LocaleService));
// notifications display management
injector.getInstance(NotificationRenderer).initialize();

const reactApp: JSX.Element = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
const rootElement: HTMLElement | null = document.getElementById('root');
if (!rootElement) {
  throw new Error('Failed to find the root element');
}
createRoot(rootElement).render(reactApp);

logger.info(`Application started in ${Date.now() - currentMillis}ms`);
