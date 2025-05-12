import { ROUTES } from '@/router/routes';
import { NavLink } from 'react-router';
import styles from './navigation.module.scss';
import clsx from 'clsx';

type NavigationProps = {
  auth: boolean;
  isOpenMenu: boolean;
  closeMenu: () => void;
};

export function Navigation({ auth, isOpenMenu, closeMenu }: NavigationProps) {
  const baseLinks = ['Home', 'Catalog', 'About'];
  const authenticationLinks = ['Login', 'Registration'];
  const headerLinks = auth ? baseLinks : [...baseLinks, ...authenticationLinks];

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
