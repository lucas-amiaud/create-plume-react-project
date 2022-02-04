import React from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { getGlobalInstance } from 'plume-ts-di';
import { useForm } from 'react-hook-form';
import { Alert } from '@mui/material';
import SessionService from '../../../services/session/SessionService';
import PlumeAdminTheme from '../../../lib/plume-admin-theme/PlumeAdminTheme';
import ActionStyle from '../../../lib/plume-admin-theme/action/ActionStyle';
import { SessionCredentials } from '../../../api/session/SessionApi';
import { FORGOT_PASSWORD, HOME } from '../../Routes';
import MessageService from '../../../i18n/messages/MessageService';
import useLoader from '../../../lib/plume-http-react-hook-loader/promiseLoaderHook';
import appLogo from '/assets/icons/plume_logo.png';
import googleLogo from '/assets/icons/google_icon.png';
import appleLogo from '/assets/icons/apple_icon.png';

export default function Login() {
  const theme = getGlobalInstance(PlumeAdminTheme);
  const sessionService = getGlobalInstance(SessionService);
  const messageService = getGlobalInstance(MessageService);
  const messages = messageService.t();
  const history = useHistory();

  if (sessionService.isAuthenticated()) {
    return <Redirect to={{ pathname: HOME }} />;
  }

  const {
    handleSubmit, control, formState: { errors },
  } = useForm<SessionCredentials>();

  const loader = useLoader();

  const tryAuthenticate = (credentials: SessionCredentials) => {
    loader.monitor(sessionService.authenticate(credentials));
  };

  return (
    <div className="login-page">
      <img src={appLogo} className="app-icon" alt="logo" />
      <h2 className="login-subtitle">{messages['app.baseline']}</h2>
      <div className="login-box">
        {
          loader.error
          && (
            <Alert className="form-errors" severity="error">{messageService.httpError(loader.error)}</Alert>
          )
        }
        <div className="login-label">{messages['login.title']}</div>
        <form onSubmit={handleSubmit(tryAuthenticate)}>
          <theme.formField inputId="userName" error={errors.userName}>
            <theme.inputText
              label={messages['users.USERNAME']}
              control={control}
              type="text"
              name="userName"
              rules={{ required: true }}
              useNameAsId
            />
          </theme.formField>
          <theme.formField inputId="password" error={errors.password}>
            <theme.inputText
              label={messages['users.PASSWORD']}
              control={control}
              type="password"
              name="password"
              autoComplete="off"
              rules={{ required: true }}
              useNameAsId
            />
          </theme.formField>
          <theme.actionsContainer>
            <theme.actionButton isLoading={loader.isLoading} style={ActionStyle.PRIMARY}>
              {messages['action.authenticate']}
            </theme.actionButton>
          </theme.actionsContainer>
        </form>
        <div className="forgotten-password">
          <a href="" onClick={() => history.push(FORGOT_PASSWORD)}>{messages['login.actions.forgot']}</a>
        </div>
        <theme.panelSeparator />
        <theme.actionsContainer cssClasses="actions--column">
          <theme.actionButton icon={googleLogo} cssClasses="login-action-button">
            {messages['action.google.authenticate']}
          </theme.actionButton>
          <theme.actionButton icon={appleLogo} cssClasses="login-action-button">
            {messages['action.apple.authenticate']}
          </theme.actionButton>
        </theme.actionsContainer>
      </div>
    </div>
  );
}
