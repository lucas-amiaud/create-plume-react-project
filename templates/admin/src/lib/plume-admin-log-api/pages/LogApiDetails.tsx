import React from 'react';
import PlumeAdminTheme from '../../plume-admin-theme/PlumeAdminTheme';
import UserApi from '../../plume-admin-users/api/UserApi';
import PlumeMessageResolver from '../../plume-messages/MessageResolver';
import NotificationEngine from '../../plume-notification/NotificationEngine';

class LogApiDetails {
  constructor(private readonly userApi: UserApi,
              private readonly notificationEngine: NotificationEngine,
              private readonly theme: PlumeAdminTheme,
              private readonly messages: PlumeMessageResolver) {
  }
  render = () => {
    return (<></>);
  }
}

export default (LogApiDetails);
