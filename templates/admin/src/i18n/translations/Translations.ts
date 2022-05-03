export interface ErrorFunction {
  (...args: string[]): string;
}

export type Translations = {
  app: {
    name: string,
    baseline: string,
  },
  // actions
  action: {
    back: string,
    cancel: string,
    save: string,
    delete: string,
    search: string,
    add: string,
    update: string,
    authenticate: string,
    disconnect: string,
    keep_editing: string,
    close: string,
    close_without_saving: string,
    google: {
      authenticate: string,
    },
    apple: {
      authenticate: string,
    },
  },
  // common labels
  label: {
    creation_date: string,
    loading: string,
    empty: string,
    more_options: string,
  },
  // common messages
  message: {
    changes_saved: string,
    unsaved_data: string,
    confirm_delete: string,
  },
  // navigation
  nav: {
    home: string,
    users: string,
    user_list: string,
    settings: string,
    log_api: string,
  },
  //format
  format : {
    date: string,
    date_mask: string,
    hour: string,
    hour_mask: string,
    date_hour: string,
    date_hour_mask: string,
  },
  // home
  home: {
    title: string,
  },
  login: {
    title: string,
    actions: {
      forgot: string,
    }
  },
  // users
  users: {
    userName: string,
    password: string,
    password_confirm: string,
    email: string,
    firstName: string,
    lastName: string,
    role: string,
  },
  // pages users
  user: {
    title_list: string,
    title_create: string,
    title_edit: string,
    add: string,
    error_passwords_different: string,
    popin: {
      title_delete: string,
      cancel: string,
    }
    list: {
      count: (count: number) => string,
    },
  },
  // logs api
  logs_api: {
    title_list: string,
    title_detail: (api: string) => string,
    api: string,
    url: string,
    date: string,
    method: string,
    status_code: string,
    body_request: string,
    body_response: string,
    header_request: string,
    header_response: string,
    list: {
      count: (count: number) => string,
    },
  },
  // sorts wording
  'sort': {
    'user': {
      'name_desc': string,
      'name_asc': string,
    },
    logs_api: {
      date_desc: string,
      date_asc: string,
    },
  }
  // filters wording
  'filter': {
    'user': {
      'title': string,
      'name': string,
      'role': string,
    },
    logs_api: {
      api_name: string,
      status_code: string,
      method: string,
    }
  }
  // errors
  error: {
    field : {
      required: string,
      email_wrong_format: string,
    },
  },
  'http-errors': {
    INTERNAL_ERROR: string,
    NETWORK_ERROR: string,
    TIMEOUT_ERROR: string,
    FORBIDDEN_ERROR: string,
    WRONG_LOGIN_OR_PASSWORD: string,
    TOO_MANY_WRONG_ATTEMPTS: (seconds: string) => string,
    FIELD_REQUIRED: (fieldName: string) => string,
    MESSAGE: (message: string) => string,
  },
};
