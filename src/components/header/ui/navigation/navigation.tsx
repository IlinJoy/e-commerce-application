import { ROUTES } from '@/router/routes';
import { NavLink } from 'react-router';
import { NAV_LINKS } from '@/utils/constants/ui';
import { useAuth } from '@/hooks/use-auth';
import styles from './navigation.module.scss';
import clsx from 'clsx';

type NavigationProps = {
  isOpenMenu?: boolean;
  closeMenu?: () => void;
};

export function Navigation({ isOpenMenu, closeMenu }: NavigationProps) {
  const { isLoggedIn } = useAuth();
  const headerLinks = isLoggedIn ? NAV_LINKS.base : [...NAV_LINKS.base, ...NAV_LINKS.auth];

  return (
    <nav className={clsx(styles.nav, { [styles.open]: isOpenMenu })}>
      {headerLinks.map((page) => (
        <NavLink
          key={page}
          to={page === 'Home' ? ROUTES.MAIN.path : page.toLowerCase()}
          className={({ isActive }) => clsx(styles.navLink, { [styles.active]: isActive })}
          onClick={closeMenu}
        >
          {page}
        </NavLink>
      ))}
    </nav>
  );
}
