import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import { HeaderMenu } from '@/components/header-menu/header-menu';
import { SpriteIcon } from '@/components/icon/icon';
import { useAuth } from '@/hooks/use-auth';
import styles from './header-button-group.module.scss';
import clsx from 'clsx';
import { useNavigate } from 'react-router';
import { ROUTES } from '@/router/routes';

type HeaderMenuProps = {
  toggleMenuHandler: () => void;
  isOpenMenu: boolean;
};

export function HeaderButtonGroup({ toggleMenuHandler, isOpenMenu }: HeaderMenuProps) {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  return (
    <div className={styles.buttonGroup}>
      <IconButton color="primary" onClick={() => navigate(ROUTES.CART.path)}>
        <Badge badgeContent={9} color="warning">
          <SpriteIcon id="cart" />
        </Badge>
      </IconButton>
      {isLoggedIn && <HeaderMenu />}
      <IconButton onClick={toggleMenuHandler} className={clsx(styles.burger, { [styles.open]: isOpenMenu })}>
        <div className={styles.line} />
        <div className={styles.line} />
      </IconButton>
    </div>
  );
}
