import { HttpMethod } from 'simple-http-request-builder';
import PlumeAdminHttpClient from '../../plume-admin-api/PlumeHttpClient';
import { LogApiDetailsType, LogApiFilters, LogApiParams, LogApiTrimmed } from './LogApiTypes';

export default class LogApiApi {
  constructor(private readonly httpClient: PlumeAdminHttpClient) {
  }

  fetchAll(apiParam: LogApiParams) {
    return this
      .httpClient
      .restRequest<LogApiTrimmed[]>(HttpMethod.GET, '/admin/logs')
      .queryParams([
        ['limit', apiParam.limit || ''],
        ['method', apiParam.method || ''],
        ['statusCode', apiParam.statusCode || ''],
        ['apiName', apiParam.apiName || ''],
        ['url', apiParam.url || ''],
        ['startDate', apiParam.startDate || ''],
        ['endDate', apiParam.endDate || '']
      ])
      .execute();
  }

  fetchById(idLog: string) {
    return this
      .httpClient
      .restRequest<LogApiDetailsType>(HttpMethod.GET, `/admin/logs/${idLog}`)
      .execute();
  }

  fetchLogApiFilters() {
    return this
      .httpClient
      .restRequest<LogApiFilters>(HttpMethod.GET, '/admin/logs-filters')
      .execute();
  }
}
