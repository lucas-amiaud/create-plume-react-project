import React from 'react';
import { getGlobalInstance } from 'plume-ts-di';
import { useOnDependenciesChange } from '../../../lib/react-hooks-alias/ReactHooksAlias';
import useToggle from '../../../lib/react-hook-toggle/ReactHookToggle';
import { UncontrolledDrawerTypeProps } from '../../../lib/plume-admin-theme/drawer/DrawerProps';
import PlumeAdminTheme from '../../../lib/plume-admin-theme/PlumeAdminTheme';

/**
 * When a drawer is a all page, there is no state to control its opening / closing
 */
function UncontrolledDrawer(
  { title, onClose, children, size, sizedByWidth, fullScreen, className }: UncontrolledDrawerTypeProps
) {
  const theme = getGlobalInstance(PlumeAdminTheme);
  useOnDependenciesChange(() => {
    setTimeout(toggleDrawerOpening, 0);
  }, []);

  const [isDrawerOpened, toggleDrawerOpening] = useToggle(false);

  const uncontrolledClose = () => {
    toggleDrawerOpening();
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
  )
}

export default (UncontrolledDrawer);
