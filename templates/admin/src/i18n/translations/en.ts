import { Translations } from './Translations';

const enMessages: Translations = {
  app: {
    name: 'Plume admin',
    baseline: 'Administration application',
  },
  // actions
  action: {
    back: 'Back',
    cancel: 'Cancel',
    save: 'Save',
    delete: 'Delete',
    search: 'Search',
    add: 'Add',
    update: 'Update',
    authenticate: 'Log in',
    disconnect: 'Log out',
    keep_editing: 'Keep editing',
    close: 'Close',
    close_without_saving: 'Close without saving',
    google: {
      authenticate: 'Log in with Google',
    },
    apple: {
      authenticate: 'Log in with Apple',
    }
  },
  // common labels
  label: {
    creation_date: 'Creation date',
    loading: 'Loading...',
    empty: 'No element',
    more_options: 'More options',
  },
  // common messages
  message: {
    changes_saved: 'Changes have been successfully saved',
    unsaved_data: 'There are unsaved changes. '
      + 'If you would like to save changes, press the "Keep editing" button',
    confirm_delete: 'To confirm the deleting, press the "Delete" button',
  },
  // navigation
  nav: {
    home: 'Home',
    users: 'User management',
    user_list: 'Users',
    settings: 'Paramètres',
    log_api: 'API Logs',
  },
  //format
  format : {
    date: 'YYYY-MM-DD',
    date_mask: '____-__-__',
    hour: 'hh:mm a',
    date_hour: 'YYYY-MM-DD hh:mm a',
  },
  // home
  home: {
    title: 'Home page',
  },
  login: {
    title: 'Please authenticate',
    actions: {
      forgot: 'I forget my password',
    }
  },
  // users
  users: {
    userName: 'User name',
    password: 'Password',
    password_confirm: 'Password confirmation',
    email: 'Email',
    firstName: 'First name',
    lastName: 'Last name',
    role: 'Role',
  },
  // pages users
  user: {
    title_list: 'Users list',
    title_create: 'User creation',
    title_edit: 'User modification',
    add: 'Add user',
    error_passwords_different: 'Password do not match its confirmation',
    list: {
      count: (count: number) => 'User count : ' + count,
    },
    popin: {
      title_delete: 'Delete user',
      cancel: 'Cancel entry',
    }
  },
  // logs api
  logs_api: {
    title_list: 'API calls List',
    title_detail: (api: string) => api + ' API request details',
    api: 'API',
    url: 'URL',
    date: 'Request date',
    method: 'HTTP method',
    status_code: 'Response code',
    body_request: 'Body request',
    body_response: 'Body response',
    header_request: 'Request headers',
    header_response: 'Response headers',
    list: {
      count: (count: number) => 'API logs count : ' + count,
    },
  },
  // sorts wording
  'sort': {
    'user': {
      'name_desc': 'Sort by descendant alphabetical order',
      'name_asc': 'Sort by ascendant alphabetical order',
    },
    logs_api: {
      date_desc: 'Sort newest to oldest',
      date_asc: 'Sort oldest to newest',
    },
  },
  // filters wording
  'filter': {
    'user': {
      'title': 'Filters',
      'name': 'Name',
      'role': 'Role',
    },
    logs_api: {
      api_name: 'API Name',
      status_code: 'Status code',
      method: 'HTTP Method',
    },
  },
  // errors
  error: {
    field: {
      required: 'Field is required',
      email_wrong_format: 'The input email address is invalid',
    }
  },
  'http-errors': {
    INTERNAL_ERROR: 'An unexpected error occurred',
    NETWORK_ERROR: 'Network error, your internet connexion seems unavailable',
    TIMEOUT_ERROR: 'Network error (timeout), your internet connection or the remote server seem unavailable',
    FORBIDDEN_ERROR: 'It seems you do not have access to this resource or this action',
    WRONG_LOGIN_OR_PASSWORD: 'User name or password incorrect',
    // eslint-disable-next-line max-len
    TOO_MANY_WRONG_ATTEMPTS: (seconds: string) => `Due to login attempt errors, your account is locked for ${seconds} seconds, please try again later`,
    FIELD_REQUIRED: (fieldName: string) => `Field '${fieldName}' is required`,
    MESSAGE: (message: string) => message,
  },
} as const;

export default enMessages;
