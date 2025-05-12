import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import type { Dispatch, SetStateAction } from 'react';
import { HeaderMenu } from '@/components/header-menu/header-menu';
import { SpriteIcon } from '@/components/icon/icon';
import styles from './header-button-group.module.scss';
import clsx from 'clsx';

type HeaderMenuProps = {
  setAuth: Dispatch<SetStateAction<boolean>>;
  toggleMenuHandler: () => void;
  auth: boolean;
  isOpenMenu: boolean;
};

export function HeaderButtonGroup({ setAuth, auth, toggleMenuHandler, isOpenMenu }: HeaderMenuProps) {
  return (
    <div className={styles.buttonGroup}>
      <IconButton color="primary">
        <Badge badgeContent={9} color="warning">
          <SpriteIcon id="cart" />
        </Badge>
      </IconButton>
      {auth && <HeaderMenu setAuth={setAuth} />}
      <IconButton onClick={toggleMenuHandler} className={clsx(styles.burger, { [styles.open]: isOpenMenu })}>
        <div className={styles.line} />
        <div className={styles.line} />
      </IconButton>
    </div>
  );
}
