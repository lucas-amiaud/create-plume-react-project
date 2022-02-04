import React from 'react';
import { Drawer as MaterialDrawer, Icon } from '@mui/material';
import { getGlobalInstance } from 'plume-ts-di';
// @ts-ignore
import cssVariables from '../../../../assets/scss/modules/_variables.module.scss';
import MessageService from '../../../i18n/messages/MessageService';
import { ActionButton } from '../action/Actions';
import { DrawerTypeProps } from '../../../lib/plume-admin-theme/layout/LayoutProps';
import ActionStyle from '../../../lib/plume-admin-theme/action/ActionStyle';

export default function Drawer(
  {
    title, children, open, close, size, fullScreen, sizedByWidth, className,
  }: DrawerTypeProps) {
  const messages = getGlobalInstance(MessageService).t();
  const { widthSmallScreen, widthMediumScreen } = cssVariables;

  // Returns width percentage of drawer
  const drawerSize = () => {
    const defaultSize = 40;
    if (sizedByWidth) {
      const width = window.innerWidth;
      if (width < widthSmallScreen) {
        return 'full';
      }

      return width < widthMediumScreen ? 60 : defaultSize;
    }

    return size || defaultSize;
  };

  return (
    <MaterialDrawer
      anchor="right"
      open={open}
      onClose={close}
      className={`drawer${className || ''} ${fullScreen ? ' drawer--full-screen' : ''} drawer--${drawerSize()}`}
    >
      <div className={`drawer ${fullScreen ? 'drawer--full' : ''}`}>
        <div className="drawer-header">
          <div className="drawer-button-container">
            <ActionButton
              onClick={close}
              style={ActionStyle.SECONDARY}
              cssClasses={ActionStyle.SECONDARY}
            >
              <Icon>chevron_left</Icon>
              {messages['action.close']}
            </ActionButton>
          </div>
          <div className="drawer-title-container">
            <h1>{title || ''}</h1>
          </div>
          <div />
        </div>
        <div className="drawer-content">{children}</div>
      </div>
    </MaterialDrawer>
  );
}
