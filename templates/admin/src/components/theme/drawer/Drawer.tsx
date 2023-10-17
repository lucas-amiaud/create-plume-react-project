import { Drawer as MaterialDrawer, Icon } from '@mui/material';
import React from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import cssVariables from '../../../../assets/scss/modules/_variables.module.scss';
import useMessages from '../../../i18n/hooks/messagesHook';
import ActionStyle from '../../../lib/plume-admin-theme/action/ActionStyle';
import {
  DrawerTypeProps,
} from '../../../lib/plume-admin-theme/drawer/DrawerProps';
import { ActionButton } from '../action/Actions';

export default function Drawer(
  {
    title, children, open, close, size, fullScreen, sizedByWidth, className,
  }: DrawerTypeProps) {
  const { messages } = useMessages();
  const { widthSmallScreen, widthMediumScreen } = cssVariables;

  // Returns width percentage of drawer
  const drawerSize = () => {
    const defaultSize: number = 40;
    const largeSize: number = 60;
    if (sizedByWidth) {
      const width: number = window.innerWidth;
      if (width < widthSmallScreen) {
        return 'full';
      }

      return width < widthMediumScreen ? largeSize : defaultSize;
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
              {messages.action.close}
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
