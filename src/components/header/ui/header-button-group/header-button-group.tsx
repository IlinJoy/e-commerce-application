import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import { HeaderMenu } from '@/components/header-menu/header-menu';
import { SpriteIcon } from '@/components/icon/icon';
import styles from './header-button-group.module.scss';
import clsx from 'clsx';
import { useAuth } from '@/context/auth-context';

type HeaderMenuProps = {
  toggleMenuHandler: () => void;
  isOpenMenu: boolean;
};

export function HeaderButtonGroup({ toggleMenuHandler, isOpenMenu }: HeaderMenuProps) {
  const { token } = useAuth();

  return (
    <div className={styles.buttonGroup}>
      <IconButton color="primary">
        <Badge badgeContent={9} color="warning">
          <SpriteIcon id="cart" />
        </Badge>
      </IconButton>
      {token && <HeaderMenu />}
      <IconButton onClick={toggleMenuHandler} className={clsx(styles.burger, { [styles.open]: isOpenMenu })}>
        <div className={styles.line} />
        <div className={styles.line} />
      </IconButton>
    </div>
  );
}
