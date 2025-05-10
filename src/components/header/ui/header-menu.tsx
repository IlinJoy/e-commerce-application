import { Stack } from '@mui/material';
import styles from '../header.module.scss';
import { NavLink } from 'react-router';
import clsx from 'clsx';
import { ROUTES } from '@/router/routes';

export function Navigation() {
  const pages = ['Home', 'Catalog', 'About'];
  return (
    <Stack component={'nav'} direction={'row'} spacing={3}>
      {pages.map((page) => (
        <NavLink
          key={page}
          to={page === 'Home' ? ROUTES.MAIN : page.toUpperCase()}
          className={({ isActive }) => clsx(styles.navLink, { [styles.active]: isActive })}
        >
          {page}
        </NavLink>
      ))}
    </Stack>
  );
}
