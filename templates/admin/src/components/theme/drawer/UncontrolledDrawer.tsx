import { getGlobalInstance } from 'plume-ts-di';
import React, { useEffect } from 'react';
import {
  UncontrolledDrawerTypeProps,
} from '../../../lib/plume-admin-theme/drawer/DrawerProps';
import PlumeAdminTheme from '../../../lib/plume-admin-theme/PlumeAdminTheme';
import useToggle from '../../../lib/react-hook-toggle/ReactHookToggle';

/**
 * When a drawer is a all page, there is no state to control its opening / closing
 */
function UncontrolledDrawer(
  {
    title,
    onClose,
    children,
    size,
    sizedByWidth,
    fullScreen,
    className,
  }: UncontrolledDrawerTypeProps,
) {
  const theme: PlumeAdminTheme = getGlobalInstance(PlumeAdminTheme);
  const [isDrawerOpened, toggleDrawer] = useToggle(false);

  useEffect(() => {
    if (!isDrawerOpened) {
      setTimeout(toggleDrawer, 0);
    }
  }, [children]);

  const uncontrolledClose = () => {
    toggleDrawer();
    setTimeout(onClose, 300);
  };

  return (
    <theme.drawer
      title={title}
      open={isDrawerOpened}
      close={uncontrolledClose}
      size={size}
      sizedByWidth={sizedByWidth}
      fullScreen={fullScreen}
      className={className}
    >
      {children}
    </theme.drawer>
  );
}

export default (UncontrolledDrawer);
