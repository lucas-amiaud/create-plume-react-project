import { Injector } from 'plume-ts-di';
import LogApiApi from './api/LogApiApi';
import LogApi from './pages/LogApi';

export default function installPlumeAdminLogApiModule(injector: Injector) {
  injector.registerSingleton(LogApi);
  injector.registerSingleton(LogApiApi);
}
