import { Stack } from '@mui/material';
import styles from '../header.module.scss';
import { NavLink } from 'react-router';
import clsx from 'clsx';
import { ROUTES } from '@/router/routes';

export function Navigation({ auth }: { auth: boolean }) {
  const baseLinks = ['Home', 'Catalog', 'About'];
  const authenticationLinks = ['Login', 'Registration'];
  const headerLinks = auth ? baseLinks : [...baseLinks, ...authenticationLinks];

  return (
    <Stack component={'nav'} direction={'row'} spacing={3}>
      {headerLinks.map((page) => (
        <NavLink
          key={page}
          to={page === 'Home' ? ROUTES.MAIN : page.toLowerCase()}
          className={({ isActive }) => clsx(styles.navLink, { [styles.active]: isActive })}
        >
          {page}
        </NavLink>
      ))}
    </Stack>
  );
}
