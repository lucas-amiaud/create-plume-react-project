import { MenuItem } from '@mui/material';
import { getGlobalInstance } from 'plume-ts-di';
import React from 'react';
import LocaleService from '../../i18n/locale/LocaleService';
import MessageService from '../../i18n/messages/MessageService';
import { Locale } from '../../lib/locale-resolver/LocaleResolver';
import SessionService from '../../services/session/SessionService';
import { User } from '../../services/session/User';
import DropdownMenu from '../theme/DropdownMenu';
import LocaleSelector from '../theme/LocaleSelector';

type HeaderProps = {
  currentLocale: Locale;
  currentUser?: User;
};

export default function Header({ currentLocale, currentUser }: HeaderProps) {
  const localeService = getGlobalInstance(LocaleService);
  const sessionService = getGlobalInstance(SessionService);
  const messages = getGlobalInstance(MessageService).t();

  const getInitialLettersOfUser = (): string => {
    const parts = currentUser?.fullName?.split(' ');
    return parts?.map((part) => part.charAt(0)).join('') || '';
  };

  if (!currentUser) {
    return (<></>);
  }
  return (
    <header id="main-header">
      <h1 className="section_name">{messages.app.baseline}</h1>
      <div className="header_actions">
        <div className="header_action">
          <LocaleSelector
            currentLocale={currentLocale}
            availableLocales={localeService.getAvailableLocales()}
            onLocaleSelected={(newLocale) => localeService.setCurrentLocale(newLocale)}
          />
        </div>
        <div className="header_action header_action--circle">
          <DropdownMenu label={getInitialLettersOfUser()} id="user-menu">
            <div id="user-name">{currentUser.fullName}</div>
            <MenuItem
              onClick={() => sessionService.disconnect()}
            >
              {messages.action.disconnect}
            </MenuItem>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
