type CommonDrawerProps = {
  title: string,
  children: React.ReactNode,
  size?: number | string,
  sizedByWidth?: boolean,
  fullScreen?: boolean,
  className?: string,
};

export interface DrawerTypeProps extends CommonDrawerProps {
  open: boolean,
  close: () => void,
}

export interface UncontrolledDrawerTypeProps extends CommonDrawerProps {
  onClose: () => void,
}
