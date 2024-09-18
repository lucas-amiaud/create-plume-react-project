/* eslint-disable max-len */
import { viteHotContext } from '@i18n/translations/hmr-config';
import { observable, WritableObservable } from 'micro-observables';
import { Translations } from './Translations';
import translationHotReload from './translations-hmr';

const enMessages: Translations = {
  app: {
    name: 'Plume admin',
  },
  // actions
  action: {
    back: 'Back',
    cancel: 'Cancel',
    save: 'Save',
    delete: 'Delete',
    close: 'Close',
    search: 'Search',
    add: 'Add',
    authenticate: 'Log in',
    disconnect: 'Log out',
    keep_editing: 'Keep editing',
    close_without_saving: 'Close without saving',
  },
  // common labels
  label: {
    confirm_delete: 'Confirm deletion',
    creation_date: 'Creation date',
    loading: 'Loading...',
  },
  // common messages
  message: {
    changes_saved: 'Changes have been successfully saved',
    unsaved_data: 'There are unsaved changes. '
      + 'If you would like to save changes, press the "Keep editing" button',
  },
  // navigation
  nav: {
    home: 'Home',
    users: 'User management',
    user_list: 'Users',
  },
  // home
  home: {
    title: 'Home page',
  },
  login: {
    title: 'Please authenticate',
  },
  // users
  users: {
    userName: 'User name',
    password: 'Password',
    email: 'Email',
    firstName: 'First name',
    lastName: 'Last name',
    role: 'Role',
    messages: {
      confirm_delete: (userName: string) => `You are about to delete ${userName}. This action is irreversible.`,
    },
  },
  // pages users
  user: {
    title_list: 'Users list',
    title_create: 'User creation',
    title_edit: 'User modification',
    password_confirm: 'Password confirmation',
    error_passwords_different: 'Password do not match its confirmation',
  },
  // errors
  error: {
    field: {
      required: 'Field is required',
      email_wrong_format: 'The input email address is invalid',
      password_same_value: 'Both passwords must be the same',
      empty_field: 'The field entered is empty',
    },
  },
  'http-errors': {
    INTERNAL_ERROR: 'An unexpected error occurred',
    NETWORK_ERROR: 'Network error, your internet connexion seems unavailable',
    TIMEOUT_ERROR: 'Network error (timeout), your internet connection or the remote server seem unavailable',
    FORBIDDEN_ERROR: 'It seems you do not have access to this resource or this action',
    WRONG_LOGIN_OR_PASSWORD: 'User name or password incorrect',
    // eslint-disable-next-line max-len
    TOO_MANY_WRONG_ATTEMPS: (seconds: string) => `Due to login attempt errors, your account is locked for ${seconds} seconds, please try again later`,
    FIELD_REQUIRED: (fieldName: string) => `Field '${fieldName}' is required`,
    MESSAGE: (message: string) => message,
  },
} as const;

const enMessagesObservable: WritableObservable<Translations> = observable(enMessages);

if (viteHotContext?.hot) {
  // Hot reloading, see translations-hmr.ts
  viteHotContext.hot.accept(translationHotReload(enMessagesObservable));
}

export default enMessagesObservable.readOnly();
