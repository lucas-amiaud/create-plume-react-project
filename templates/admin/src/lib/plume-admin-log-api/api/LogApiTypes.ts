export type LogApiTrimmed = {
  id: string,
  date: string,
  method: string,
  api: string,
  url: string,
  statusCode: number,
};

export type LogHeader = {
  id: string,
  idLogApi: string,
  name: string,
  type: string,
  value: string,
}

export type HttpHeaders = {
  headers: LogHeader[],
  mimeType: string,
}

export type LogApiDetailsType = {
  id: string,
  api: string,
  url: string,
  date: string,
  method: string,
  statusCode: string,
  bodyRequest: string,
  bodyResponse: string,
  headerRequest: HttpHeaders,
  headerResponse: HttpHeaders,
  isCompleteTextRequest: boolean,
  isCompleteTextResponse: boolean,
};

export type LogApiParams = {
  limit?: number,
  method?: string,
  statusCode?: number,
  apiName?: string,
  url?: string,
  startDate?: string,
  endDate?: string,
}

export type LogApiFilters = {
  apiNames: string[],
  statusCodes: number[],
}
